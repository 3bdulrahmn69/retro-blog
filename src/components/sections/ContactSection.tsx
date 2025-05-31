import Button from '../ui/Button';
import Container from '../ui/Container';
import Section from '../ui/Section';

const ContactSection = ({ activeSection }: { activeSection: number }) => {
  return (
    <Section id="contact" className="bg-amber-100">
      <Container>
        <div
          className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-700 ${
            activeSection >= 4
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 text-center font-bold border-b-4 border-amber-700">
            <h3 className="text-2xl tracking-wider">CONTACT US</h3>
          </div>
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-amber-800">
                  Send Us a Message
                </h4>
                <p className="text-amber-700">
                  Have questions or suggestions? Drop us a line and we'll get
                  back to you as soon as our dial-up connection allows.
                </p>

                <div className="bg-amber-50 p-4 border-l-4 border-amber-500">
                  <h5 className="text-lg font-bold text-amber-800 mb-2">
                    Office Hours
                  </h5>
                  <p className="text-amber-700">
                    Monday - Friday: 9:00 AM - 5:00 PM
                  </p>
                  <p className="text-amber-700">
                    Weekends: Closed (Our computers need rest too)
                  </p>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    aria-label="your name"
                    className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    aria-label="email"
                    className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    aria-label="message"
                    className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  ></textarea>
                </div>

                <a href="https://3bdulrahmn.vercel.app/#contact">
                  <Button type="button">SEND MESSAGE</Button>
                </a>

                <p className="text-xs text-amber-700 mt-2">
                  * Messages are delivered via virtual floppy disk. Please allow
                  24-48 hours for response.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactSection;
