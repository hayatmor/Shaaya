# SHAAYA - Handpan Artist Website

A modern, elegant website for Shaaya (Daniel) - a Handpan artist & musician.

## Features

- Beautiful dark-themed single-page application
- Looping background video on the homepage
- Responsive design (mobile & desktop)
- RTL (Right-to-Left) Hebrew support
- Social media integration (Instagram, Facebook, YouTube, TikTok)
- Contact form with email integration
- WhatsApp floating button
- Sections: Home, About, Services/Workshops, Video Gallery, Testimonials, Contact

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library
- **EmailJS** - Contact form email delivery

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Email Configuration

The contact form sends messages to `pantamexperience@gmail.com`. To enable EmailJS:

1. Create an account at [emailjs.com](https://www.emailjs.com/)
2. Create a service connected to your email
3. Create an email template with variables: `from_name`, `phone`, `interest`, `message`, `to_email`
4. Update the service ID, template ID, and public key in `src/App.jsx` (ContactPage component)

Without EmailJS configuration, the form falls back to the system's default email client (mailto).

## Social Links

- Instagram: [@daniel_shaya](https://www.instagram.com/daniel_shaya)
- Facebook: [dshaya](https://www.facebook.com/dshaya)
- YouTube: [דניאל שעיה](https://www.youtube.com/channel/UCKiAPaAouYL5zeKKhZ-Pomg)
- TikTok: [@daniel_shaya](https://www.tiktok.com/@daniel_shaya)
