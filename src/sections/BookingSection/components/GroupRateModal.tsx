import { useState, useEffect, useRef, FormEvent } from 'react';
import { useMutation, useQuery } from '@animaapp/playground-react-sdk';

type GroupCourseOption = { value: string; label: string };

const FALLBACK_COURSES: GroupCourseOption[] = [
  { value: 'Stop The Bleed', label: 'Stop The Bleed' },
  { value: 'First Aid CPR AED', label: 'First Aid CPR AED' },
  { value: 'ETCC Emergency Tactical Casualty Control', label: 'ETCC Emergency Tactical Casualty Control' },
  { value: 'BLS \u2013 Basic Life Saving for Rescuers', label: 'BLS \u2013 Basic Life Saving for Rescuers' },
  { value: 'Refuse To Be A Victim', label: 'Refuse To Be A Victim' },
  { value: 'Situational Awareness Lvl 1', label: 'Situational Awareness Lvl 1' },
  { value: 'De-escalation That Works', label: 'De-escalation That Works' },
  { value: 'MACE Personal Defense Spray', label: 'MACE Personal Defense Spray' },
  { value: 'Conducted Energy Devices Level 1', label: 'Conducted Energy Devices Level 1' },
];

type GroupFormState = {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  numberOfAttendees: string;
  trainingLocation: string;
  preferred_date: string;
  notes: string;
};

const INITIAL = (initialCourse: string): GroupFormState => ({
  fullName: '',
  email: '',
  phone: '',
  course: initialCourse || COURSES[0],
  numberOfAttendees: '',
  trainingLocation: '',
  preferred_date: '',
  notes: '',
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: string;
};


export const GroupRateModal = ({ isOpen, onClose, initialCourse }: Props) => {
  const { data: dbCourses } = useQuery("Course", {
    where: { switch: 1 },
    orderBy: { order: "asc" },
  });

  const COURSES: GroupCourseOption[] = dbCourses && dbCourses.length > 0
    ? dbCourses.map((c) => ({
        value: c.title,
        label: c.groupPrice ? `${c.title} \u2014 ${c.groupPrice}` : c.title,
      }))
    : FALLBACK_COURSES;

  const defaultCourse = initialCourse || COURSES[0]?.value || '';

  const [form, setForm] = useState<GroupFormState>(INITIAL(defaultCourse));
  const [errors, setErrors] = useState<Partial<GroupFormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { create, isPending } = useMutation('Booking');

  // Sync initialCourse when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL(defaultCourse));
      setErrors({});
      setSubmitted(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialCourse]);

  // Escape key close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof GroupFormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errs: Partial<GroupFormState> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email.';
    }
    if (!form.course) errs.course = 'Please select a course.';
    if (!form.numberOfAttendees) errs.numberOfAttendees = 'Please select a group size.';
    if (!form.trainingLocation) errs.trainingLocation = 'Please select a location.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await create({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone || undefined,
        course: form.course,
        preferredDate: form.preferred_date ? new Date(form.preferred_date) : new Date(),
        notes: form.notes || undefined,
        numberOfAttendees: form.numberOfAttendees,
        trainingLocation: form.trainingLocation,
        requestType: 'group',
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Group rate submission error:', err);
    }
  };

  const inputClass = (field: keyof GroupFormState) =>
    `text-sm h-12 outline-none w-full border px-4 py-2 rounded-lg transition-colors bg-white ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-sky-400'
    }`;

  return (
    <div
      ref={overlayRef}
      data-testid="group-rate-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div data-testid="group-rate-modal-panel" className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-sky-900 font-inter">Group Rate Request</h2>
            <p className="text-gray-500 text-sm mt-1">Fill out this form and we&#39;ll contact you with group pricing.</p>
          </div>
          <button
            onClick={onClose}
            data-testid="group-rate-btn-close"
            className="text-gray-400 hover:text-gray-700 transition-colors ml-4 mt-1 shrink-0"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center px-8 pb-10 gap-5 pt-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Request Received!</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Thank you, <strong>{form.fullName}</strong>! We&#39;ll reach out with group pricing for <strong>{form.course}</strong> within 24 hours.
            </p>
            <button
              onClick={onClose}
              data-testid="group-btn-success-close"
              className="bg-sky-900 text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-sky-950 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate data-testid="group-rate-form" className="px-8 pb-8 pt-2 space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="group-full-name" className="text-sm font-semibold block mb-1">Full Name <span className="text-amber-600">*</span></label>
              <input type="text" id="group-full-name" name="fullName" data-testid="group-input-full-name" placeholder="Jane Smith" value={form.fullName} onChange={handleChange} className={inputClass('fullName')} />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="group-email" className="text-sm font-semibold block mb-1">Email Address <span className="text-amber-600">*</span></label>
              <input type="email" id="group-email" name="email" data-testid="group-input-email" placeholder="jane@example.com" value={form.email} onChange={handleChange} className={inputClass('email')} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="group-phone" className="text-sm font-semibold block mb-1">Phone Number</label>
              <input type="tel" id="group-phone" name="phone" data-testid="group-input-phone" placeholder="(609) 000-0000" value={form.phone} onChange={handleChange} className="text-sm h-12 outline-none w-full border border-gray-200 focus:border-sky-400 bg-white px-4 py-2 rounded-lg transition-colors" />
            </div>

            {/* Select Course */}
            <div>
              <label htmlFor="group-course" className="text-sm font-semibold block mb-1">Select Course <span className="text-amber-600">*</span></label>
              <div className="relative">
                <select id="group-course" name="course" data-testid="group-select-course" value={form.course} onChange={handleChange} className={`appearance-none ${inputClass('course')}`}>
                  {COURSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
            </div>

            {/* Number of Attendees */}
            <div>
              <label htmlFor="group-attendees" className="text-sm font-semibold block mb-1">Number of Attendees <span className="text-amber-600">*</span></label>
              <div className="relative">
                <select id="group-attendees" name="numberOfAttendees" data-testid="group-select-attendees" value={form.numberOfAttendees} onChange={handleChange} className={`appearance-none ${inputClass('numberOfAttendees')}`}>
                  <option value="" disabled>Please Select</option>
                  <option value="3-6">3 – 6</option>
                  <option value="7-12">7 – 12</option>
                  <option value="13+ (Refuse To Be A Victim Only)">13+ (Refuse To Be A Victim Only)</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {errors.numberOfAttendees && <p className="text-red-500 text-xs mt-1">{errors.numberOfAttendees}</p>}
            </div>

            {/* Training Location */}
            <div>
              <label htmlFor="group-location" className="text-sm font-semibold block mb-1">Training Location <span className="text-amber-600">*</span></label>
              <div className="relative">
                <select id="group-location" name="trainingLocation" data-testid="group-select-location" value={form.trainingLocation} onChange={handleChange} className={`appearance-none ${inputClass('trainingLocation')}`}>
                  <option value="" disabled>Please Select</option>
                  <option value="Client Location">Client Location</option>
                  <option value="SASSTAC Location">SASSTAC Location</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {errors.trainingLocation && <p className="text-red-500 text-xs mt-1">{errors.trainingLocation}</p>}
            </div>

            {/* Preferred Date */}
            <div>
              <label htmlFor="group-preferred-date" className="text-sm font-semibold block mb-1">Preferred Date(s)</label>
              <textarea id="group-preferred-date" name="preferred_date" data-testid="group-textarea-preferred-date" placeholder="Enter your preferred date(s) or date range" value={form.preferred_date} onChange={handleChange} className="text-sm outline-none min-h-[80px] resize-none w-full border border-gray-200 focus:border-sky-400 bg-white px-4 py-3 rounded-lg transition-colors" />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="group-notes" className="text-sm font-semibold block mb-1">Additional Notes</label>
              <textarea id="group-notes" name="notes" data-testid="group-textarea-notes" placeholder="Any specific requirements or questions?" value={form.notes} onChange={handleChange} className="text-sm outline-none min-h-[80px] resize-none w-full border border-gray-200 focus:border-sky-400 bg-white px-4 py-3 rounded-lg transition-colors" />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                data-testid="group-btn-submit"
                disabled={isPending}
                className="flex-1 bg-sky-900 text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-sky-950 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? 'Sending...' : 'Submit Group Request'}
              </button>
              <button
                type="button"
                data-testid="group-btn-cancel"
                onClick={onClose}
                className="text-gray-500 text-sm font-semibold border border-gray-200 px-6 py-3 rounded-full hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
