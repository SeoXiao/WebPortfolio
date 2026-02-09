from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.http import require_POST
import json
import re

from .forms import ContactForm
from .models import ContactMessage

@require_POST
def send_contact_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            form = ContactForm(data)
            
            if form.is_valid():
                # Save to database
                contact_message = form.save()
                
                # Prepare email content
                name = form.cleaned_data['name']
                email = form.cleaned_data['email']
                subject = form.cleaned_data['subject']
                message = form.cleaned_data['message']
                
                # Email me
                email_subject = f'New Contact from Portfolio: {subject}'
                email_body = f"""
                New contact form submission:
                
                Name: {name}
                Email: {email}
                Subject: {subject}
                Message: {message}
                
                Received at: {contact_message.created_at}
                """
                
                # Send email
                send_mail(
                    email_subject,
                    email_body,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )
                
                # Auto reply to sender
                auto_reply_subject = "Thank you for contacting me!"
                auto_reply_body = f"""
                Hi {name},
                
                Thank you for reaching out! I have received your message and will get back to you as soon as possible.
                
                Here's a copy of your message:
                Subject: {subject}
                Message: {message}
                
                Best regards,
                Sherwin
                Backend Developer
                """
                
                send_mail(
                    auto_reply_subject,
                    auto_reply_body,
                    settings.DEFAULT_FROM_EMAIL,
                    [email], 
                    fail_silently=False,
                )
                
                return JsonResponse({
                    'success': True,
                    'message': 'Message sent successfully! I will get back to you soon.'
                })
            else:
                # Return form errors
                errors = {}
                for field, error_list in form.errors.items():
                    errors[field] = error_list[0] 
                
                return JsonResponse({
                    'success': False,
                    'errors': errors,
                    'message': 'Please fix the errors below.'
                }, status=400)
                
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'message': 'Invalid request data.'
            }, status=400)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'An error occurred: {str(e)}'
            }, status=500)
    
    return JsonResponse({
        'success': False,
        'message': 'Invalid request method.'
    }, status=405)