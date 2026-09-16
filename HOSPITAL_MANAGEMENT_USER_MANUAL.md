# MediSync AI - Hospital Management System User Manual & Guide

Welcome to the official User Manual and Operational Guide for **MediSync AI**, an enterprise-grade, multi-role Hospital Management System (HMS). This comprehensive guide is designed for system administrators, healthcare providers (doctors, nurses, pharmacists), reception staff, and patients to efficiently navigate and utilize the software.

---

## Table of Contents
1. [System Overview & Architecture](#1-system-overview--architecture)
2. [Getting Started & Installation](#2-getting-started--installation)
3. [User Roles & Authentication](#3-user-roles--authentication)
4. [Admin Portal Guide](#4-admin-portal-guide)
5. [Doctor Portal Guide](#5-doctor-portal-guide)
6. [Receptionist Portal Guide](#6-receptionist-portal-guide)
7. [Patient Portal Guide](#7-patient-portal-guide)
8. [Pharmacy Portal Guide](#8-pharmacy-portal-guide)
9. [Shared & AI-Powered Features](#9-shared--ai-powered-features)
10. [API & Data Specifications](#10-api--data-specifications)
11. [Troubleshooting & FAQ](#11-troubleshooting--faq)

---

## 1. System Overview & Architecture

**MediSync AI** is a modernized, full-stack Hospital Management System designed to streamline clinical workflows, automate administrative processes, and improve patient care outcomes through AI-driven insights.

### Core Architecture
* **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React icons, Framer Motion, Recharts.
* **State Management**: Zustand with persistent storage sync.
* **Backend API**: Node.js, Express, TypeScript, JWT Authentication.
* **Database**: PostgreSQL (Production) / SQLite (Development fallback).
* **Containerization**: Docker & Docker Compose support.

---

## 2. Getting Started & Installation

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **Docker & Docker Compose** (Optional, for containerized execution)

### Local Environment Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/medisync-ai.git
   cd medisync-ai
   ```

2. **Frontend Installation & Launch**
   ```bash
   npm install
   npm run dev
   ```
   The web portal will be accessible at `http://localhost:5173`.

3. **Backend Service Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The backend API runs at `http://localhost:5000`.

4. **Docker Deployment (Alternative)**
   ```bash
   docker-compose up --build -d
   ```

---

## 3. User Roles & Authentication

MediSync AI implements Role-Based Access Control (RBAC) to ensure security and privacy compliance across all operational departments.

### Supported User Roles
| Role | Primary Responsibilities | Access Scope |
| :--- | :--- | :--- |
| **Admin** | System management, staff onboarding, financial reporting, analytics | Full System Access |
| **Doctor** | Consultations, electronic prescriptions, patient medical records | Clinical & Patient Records |
| **Receptionist**| Patient intake, queue management, appointment desk | Desk & Queue Operations |
| **Patient** | Appointment booking, medical history, bill payment | Personal Records Only |
| **Pharmacy** | Order fulfillment, prescription validation, dispensing | Pharmacy Queue |

### Default Credentials (Demo / Testing Environment)
* **Admin**: `admin@medisync.com` | Password: `password123`
* **Doctor**: `doctor@medisync.com` | Password: `password123`
* **Receptionist**: `receptionist@medisync.com` | Password: `password123`
* **Patient**: `patient@medisync.com` | Password: `password123`
* **Pharmacy**: `pharmacy@medisync.com` | Password: `password123`

---

## 4. Admin Portal Guide

The Admin Portal serves as the central command center for hospital operations.

### Key Capabilities
1. **Executive Dashboard**:
   * Live operational widgets displaying total registered patients, active medical staff, daily appointments, monthly revenue, pending bills, emergency cases, and bed occupancy rates.
2. **Patient Directory Management**:
   * Register, edit, search, filter, or deactivate patient profiles.
   * View full patient demographic details, emergency contacts, insurance policies, and assigned primary physicians.
3. **Doctor & Staff Administration**:
   * Add new medical staff, define department assignments (e.g., Cardiology, Neurology, Pediatrics, Orthopedics).
   * Configure consultation fees, weekly shift schedules, and upload digital signatures for official document signing.
4. **Billing & Revenue Management**:
   * Generate itemized invoices, apply service charges, track payment statuses (`Paid`, `Pending`, `Partial`, `Overdue`).
5. **Analytics & Business Intelligence**:
   * Recharts-driven visual analytics for monthly revenue growth, department-wise patient distribution, and average waiting time metrics.
6. **System Settings**:
   * Hospital profile settings, tax configurations, security settings, backup management, and audit logs.

---

## 5. Doctor Portal Guide

Designed specifically for clinicians to manage daily consultations efficiently.

### Workflow & Features
1. **Doctor Dashboard**:
   * View daily consultation schedules, pending appointments, emergency alerts, and recent patient visits.
2. **Appointment Desk**:
   * Transition appointment status through lifecycle stages: `Scheduled` ➔ `Waiting` ➔ `In Progress` ➔ `Confirmed` / `Completed`.
3. **Electronic Health Records (EHR)**:
   * Access medical history, vital signs, allergy logs, chronic conditions, and diagnostic reports before or during consultations.
4. **Electronic Prescriptions (e-Prescribing)**:
   * Select medications, dosage instructions, frequency (e.g., 1-0-1), and treatment duration.
   * Attach clinical notes and automatically apply the doctor's digital signature.

---

## 6. Receptionist Portal Guide

Focused on front-desk patient intake, queue optimization, and triage scheduling.

### Operational Features
1. **Patient Registration**:
   * Quick-register new walk-in patients with vital info: Name, Age, Gender, Phone, Email, Blood Group, Address, Emergency Contact, and Insurance details.
2. **Queue & Token Management**:
   * Issue digital tokens for walk-in consultations.
   * Track live queue status across departments to minimize patient wait times.
3. **Appointment Booking Desk**:
   * Schedule new appointments for doctors based on real-time availability slots and priority levels (`Normal`, `High`, `Emergency`).

---

## 7. Patient Portal Guide

Empowers patients with self-service capabilities and transparent healthcare access.

### Patient Capabilities
1. **Personal Dashboard**:
   * View upcoming appointments, active prescriptions, and recent medical invoices.
2. **Self-Service Appointment Booking**:
   * Choose department, select preferred physician, pick date/time slot, and provide visit reasons.
3. **Billing & Payments**:
   * Review detailed invoice breakdowns and pay outstanding bills online or upload payment receipts.
4. **Medical Records & Prescriptions**:
   * Download digital PDF prescriptions and view complete historical consultation records.

---

## 8. Pharmacy Portal Guide

Facilitates efficient medication dispensing and prescription management.

### Key Workflows
1. **Prescription Processing Queue**:
   * Real-time list of electronic prescriptions submitted by doctors.
2. **Verification & Dispensing**:
   * Review prescribed drug names, dosages, and administration notes.
   * Mark orders as `Filled`, `Dispensed`, or `Completed`.

---

## 9. Shared & AI-Powered Features

### MediSync AI Clinical Assistant
* **Symptom Triage**: Enter patient symptoms to receive AI-assisted differential diagnosis suggestions and risk stratification.
* **Clinical Note Generator**: Converts concise doctor notes into formatted medical summaries.

### Emergency Medical Wallet
* **Instant Triage Access**: Provides immediate access to critical emergency data: blood group, severe allergies, chronic conditions, emergency contact numbers, and digital ID card generation.

### System Notifications
* **Real-Time Alerts**: Automated notifications for emergency admissions, appointment cancellations, pending bill reminders, and prescription fills.

---

## 10. API & Data Specifications

MediSync AI backend provides structured JSON REST endpoints protected by JWT bearer token authorization.

### Key API Endpoints
* `POST /api/auth/login` - User authentication & JWT issuance.
* `GET /api/patients` - Retrieve registered patients list.
* `POST /api/patients` - Register a new patient.
* `GET /api/doctors` - Retrieve doctors directory.
* `GET /api/appointments` - Fetch system appointments.
* `POST /api/appointments` - Schedule a new appointment.
* `PUT /api/appointments/:id/status` - Update appointment state.
* `GET /api/prescriptions` - Fetch electronic prescriptions.
* `POST /api/prescriptions` - Generate new e-prescription.
* `GET /api/invoices` - Fetch billing & invoice records.
* `POST /api/invoices/:id/pay` - Process invoice payment.

---

## 11. Troubleshooting & FAQ

### Frequently Asked Questions

**Q1: How do I change my account password?**
* Navigate to **Settings** in your respective portal, click on **Security**, and follow the password update prompt.

**Q2: What happens if an emergency case arrives at the front desk?**
* Receptionists can immediately set the appointment priority to `Emergency`. This automatically places the patient at the top of the doctor's queue and triggers a system-wide emergency alert notification.

**Q3: Can doctors attach digital signatures to prescriptions?**
* Yes. Doctors can upload their official digital signature image in their profile settings. The system automatically stamps this signature on generated e-prescriptions.

---
*MediSync AI User Manual - Version 1.0.0 | Enterprise Healthcare Solutions*
