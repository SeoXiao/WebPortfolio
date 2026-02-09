from django import forms
from .models import ContactMessage
import re

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your Name',
                'required': True
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your Email',
                'required': True
            }),
            'subject': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Subject',
                'required': True
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Your Message',
                'rows': 5,
                'required': True
            }),
        }
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        
        if not re.match(email_pattern, email):
            raise forms.ValidationError("Please enter a valid email address (e.g., name@example.com)")
        
        # Check common fake email patterns
        fake_patterns = [
            r'test@',
            r'example@',
            r'fake@',
            r'demo@',
            r'@example\.com$',
            r'@test\.com$',
        ]
        
        for pattern in fake_patterns:
            if re.search(pattern, email, re.IGNORECASE):
                raise forms.ValidationError("Please use a real email address")
        
        return email
    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if len(name.strip()) < 2:
            raise forms.ValidationError("Name must be at least 2 characters long")
        if not re.match(r'^[a-zA-Z\s]+$', name):
            raise forms.ValidationError("Name can only contain letters and spaces")
        return name.strip()