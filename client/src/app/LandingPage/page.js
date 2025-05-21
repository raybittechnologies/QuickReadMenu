/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import Link from "next/link";
import Button from "../components/Button/page";
import { motion } from "framer-motion";

const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : -30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      },
    },
  };
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10"
        initial="hidden"
        animate="show"
        variants={fadeIn("up")}
      >
        <motion.div variants={fadeIn("up", 0.2)}>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#6220fb] mb-6 leading-tight">
            Create Beautiful <br className="hidden md:block" /> QR Menus for
            Your Business
          </h1>
          <p className="text-lg font-medium text-[#6220fb] mb-8">
            Design, customize, and share your digital menu instantly. Ideal for
            restaurants, cafes, food trucks, and more.
          </p>
          <Link href="/getStarted">
            <Button text="Generate Menu" />
          </Link>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.img
            src="https://img.freepik.com/free-vector/characters-scanning-qr-codes-their-phones_23-2148616039.jpg?ga=GA1.1.84694347.1747128707&semt=ais_hybrid&w=740"
            alt="Scan QR Menu"
            width={500}
            height={500}
            className=""
          />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-10 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up")}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center text-[#6220fb] mb-12"
            variants={fadeIn("up", 0.1)}
          >
            Why Choose Our QR Menu Platform?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Easy to Create",
                desc: "Build your menu in just a few clicks—no design skills needed.",
              },
              {
                title: "Fully Customizable",
                desc: "Match your branding with your choice of colors, fonts, and layout.",
              },
              {
                title: "Instant QR Generation",
                desc: "Get a shareable QR code as soon as you’re done.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-[#6220fb]/50 p-6 rounded-xl shadow"
                variants={fadeIn("up", 0.2 + index * 0.1)}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-[#e3e6fd] to-[#d7eaff] text-[#6220fb] text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up")}
      >
        <div className=" max-w-3xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold mb-4"
            variants={fadeIn("up", 0.1)}
          >
            Ready to Make Your Menu Stand Out?
          </motion.h2>
          <motion.p className="text-lg mb-6" variants={fadeIn("up", 0.2)}>
            Start building your digital QR menu now—fast, free, and beautiful.
          </motion.p>
          <Link href="/getStarted">
            <Button text="Generate Menu!" />
          </Link>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="py-10 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up")}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl font-bold text-blue-900 mb-12"
            variants={fadeIn("up", 0.1)}
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-10 text-[#6220fb]">
            {[
              {
                icon: "📝",
                title: "Add Details",
                desc: "Enter your business name, menu items, and pricing.",
              },
              {
                icon: "🎨",
                title: "Customize",
                desc: "Choose colors, fonts, and layout that suit your brand.",
              },
              {
                icon: "📎",
                title: "Generate QR",
                desc: "Instantly create and download your unique QR code.",
              },
              {
                icon: "📱",
                title: "Share & Use",
                desc: "Print or display the code for customers to scan and view.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                className="bg-white p-4 flex flex-col justify-between items-center shadow-[8px_2px_8px_8px_#6220fb10]"
                variants={fadeIn("up", 0.2 + index * 0.1)}
              >
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Try QR Menu Section */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-center gap-[20%] p-10 bg-gradient-to-r from-[#e3e6fd] to-[#d7eaff] min-h-[80vh]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up")}
      >
        <motion.div
          className="bg-white p-4 rounded-lg shadow-lg"
          variants={fadeIn("up", 0.2)}
        >
          <img
            src="https://img.freepik.com/free-vector/qr-code-person-holding-smartphone_23-2148620753.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740"
            alt="Cafe Mauro QR Code"
            className="w-64 h-64 object-contain"
          />
        </motion.div>

        <motion.div
          className="max-w-md text-center md:text-left"
          variants={fadeIn("up", 0.4)}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Give a qr menu a try!
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            See how easy it is to use a qr menu. Simply open your phone camera
            and scan this code to discover cafe mauro’s menu on your phone.
          </p>
          <Link href="/getStarted">
            <Button text=" Build my menu" />
          </Link>
        </motion.div>
      </motion.section>

      {/* Footer (no animation for simplicity) */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-white py-10 px-6 md:px-16 text-sm text-gray-700"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 max-w-7xl mx-auto">
          {/* Left section */}
          <motion.div variants={fadeUp} className="flex-1 max-w-xs">
            <div className="flex items-center mb-2">
              <img src="/qr-icon.png" alt="QR Icon" className="w-5 h-5 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                <span className="text-[#6220fb]">QR</span>menu
              </span>
            </div>
            <p className="mb-3">
              QR Menu Builder is an easy, quick, and free solution to building a
              fast-loading digital QR menu yourself or with the help of our
              experts!
            </p>
            <p className="text-xs text-gray-500 font-semibold">
              POWERED BY{" "}
              <img
                src="/dopweb-logo.png"
                alt="QR Logo"
                className="inline w-16 ml-1"
              />
            </p>
          </motion.div>

          {/* Right section links */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-10 flex-1 justify-between border-l pl-10"
          >
            {/* Discover */}
            <div>
              <h4 className="font-semibold mb-2">Discover</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:underline">
                    Menu pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    My Menus
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="space-y-1">
                <li>
                  <a href="/Signup" className="hover:underline">
                    Signup
                  </a>
                </li>
                <li>
                  <a href="/UserProfile" className="hover:underline">
                    Web Agency
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Website Builder
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="font-semibold mb-2">Policies</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:underline">
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-2">Get in touch</h4>
              <p className="mb-2">+1(213) 550-3317</p>
              <div className="flex space-x-2">
                {["facebook", "instagram", "youtube"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
                  >
                    <img
                      src={`/icons/${platform}.svg`}
                      alt={`${platform} icon`}
                      className="w-4 h-4"
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
