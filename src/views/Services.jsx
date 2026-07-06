/*import React, { useContext } from "react";
import { serviceData } from "../constants";
import { ThemeContext } from "../themeProvider";
import { motion } from "framer-motion";

const Services = () => {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={
        theme.state.darkMode ? "pb-20 bg-fixed bg-gray-100" : "pb-20 bg-black"
      }
      // style={{backgroundImage: `url('https://i.pinimg.com/originals/b0/b1/f5/b0b1f5d33de00e3c21ad29bbba25e31b.gif')`}}>
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 px-4 pt-20"
        id="services"
      >
        <h2
          className={
            theme.state.darkMode
              ? "text-5xl font-bold px-4 md:px-0 text-center"
              : "text-5xl font-bold px-4 md:px-0 text-center text-white"
          }
        >
          Services
        </h2>
        <div className="">
          <h4 className="mt-16 text-3xl font-semibold text-blue-500">
            What I Provide
          </h4>
          <div className="mt-8 flex md:flex-row justify-between flex-col md:items-stretch items-center ">
            {serviceData.map((el) => (
              <motion.div
                initial="hidden"
                whileInView={"visible"}
                variants={{
                  visible: { opacity: 1, scale: 1 },
                  hidden: { opacity: 0, scale: 0 },
                }}
                className={
                  theme.state.darkMode
                    ? "md:w-96 p-4 bg-white rounded-lg flex items-center flex-col mt-8"
                    : "md:w-96 p-4 bg-gray-100 rounded-lg flex items-center flex-col mt-8"
                }
              >
                <img src={el.img} alt="" />
                <h4 className="text-xl font-bold mt-4">{el.name}</h4>
                <p className="text-lg mt-2 text-justify">{el.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
*/
import React, { useContext, useRef } from "react";
import { serviceData } from "../constants";
import { ThemeContext } from "../themeProvider";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/* ── Animated 3-D tilt card ─────────────────────────────────────────── */
const TiltCard = ({ children, dark }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 300, damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300, damping: 30,
  });
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX, rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="relative group w-full"
    >
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, ${
                dark ? "rgba(99,102,241,0.18)" : "rgba(59,130,246,0.15)"
              } 0%, transparent 70%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
};

/* ── Floating orbs background ───────────────────────────────────────── */
const Orbs = ({ dark }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
    {[
      { size: 320, top: "5%",  left: "-5%",  delay: 0,   dur: 12 },
      { size: 240, top: "60%", left: "75%",  delay: 2,   dur: 15 },
      { size: 180, top: "30%", left: "50%",  delay: 4,   dur: 10 },
      { size: 140, top: "80%", left: "20%",  delay: 1.5, dur: 13 },
    ].map((o, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: o.size, height: o.size,
          top: o.top, left: o.left,
          background: dark
            ? `radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{ y: [0, -30, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);

/* ── Particle dots grid ─────────────────────────────────────────────── */
const DotGrid = ({ dark }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(circle, ${
        dark ? "rgba(99,102,241,0.15)" : "rgba(59,130,246,0.12)"
      } 1px, transparent 1px)`,
      backgroundSize: "32px 32px",
      maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
    }}
  />
);

/* ── Service icon wrapper with 3-D depth ────────────────────────────── */
const IconBox = ({ img, dark }) => (
  <div className="relative mb-6 flex items-center justify-center" style={{ perspective: 600 }}>
    <motion.div
      className="relative z-10 rounded-2xl p-4 flex items-center justify-center"
      style={{
        background: dark
          ? "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))"
          : "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.1))",
        border: dark
          ? "1px solid rgba(99,102,241,0.3)"
          : "1px solid rgba(59,130,246,0.25)",
        boxShadow: dark
          ? "0 8px 32px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 8px 24px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
      whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img src={img} alt="" className="w-14 h-14 object-contain" style={{ filter: "drop-shadow(0 4px 12px rgba(99,102,241,0.4))" }} />
    </motion.div>
    {/* Ring pulse */}
    <motion.div
      className="absolute rounded-2xl"
      style={{
        inset: -6,
        border: dark ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(59,130,246,0.18)",
      }}
      animate={{ opacity: [0.5, 1, 0.5], scale: [0.97, 1.03, 0.97] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

/* ── Animated counter badge ─────────────────────────────────────────── */
const Badge = ({ index, dark }) => (
  <motion.span
    className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
    style={{
      background: dark
        ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
        : "linear-gradient(135deg, #3b82f6, #6366f1)",
      color: "#fff",
      boxShadow: "0 4px 12px rgba(99,102,241,0.5)",
    }}
    initial={{ scale: 0, rotate: -180 }}
    whileInView={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", delay: index * 0.15 + 0.4 }}
  >
    0{index + 1}
  </motion.span>
);

/* ── Shimmer border animation ───────────────────────────────────────── */
const ShimmerBorder = ({ dark }) => (
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none"
    style={{
      background: `linear-gradient(90deg, transparent 0%, ${
        dark ? "rgba(99,102,241,0.4)" : "rgba(59,130,246,0.35)"
      } 50%, transparent 100%)`,
      backgroundSize: "200% 100%",
    }}
    animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
  />
);

/* ── Main Services component ────────────────────────────────────────── */
const Services = () => {
  const theme = useContext(ThemeContext);
  const dark = theme.state.darkMode;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.92 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{
        background: dark
          ? "linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)"
          : "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
        paddingBottom: "6rem",
      }}
    >
      <DotGrid dark={dark} />
      <Orbs dark={dark} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">

        {/* ── Section heading ── */}
        <motion.div
          className="text-center mb-4"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: dark
                ? "rgba(99,102,241,0.12)"
                : "rgba(99,102,241,0.1)",
              border: dark
                ? "1px solid rgba(99,102,241,0.25)"
                : "1px solid rgba(99,102,241,0.2)",
              color: dark ? "#6366f1" : "#818cf8",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              🤷‍♀️
            </motion.span>
            What I Offer
          </motion.div>

          {/* Main title */}
          <h2
            className="text-5xl md:text-6xl font-bold tracking-tight"
            style={{
              color: dark ? "#111827" : "#f8fafc",
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Services
            </span>
          </h2>

          {/* Subtitle */}
          <motion.p
            className="mt-4 text-lg max-w-xl mx-auto"
            style={{ color: dark ? "#6b7280" : "rgba(248,250,252,0.55)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Crafting digital experiences that blend design excellence with technical precision.
          </motion.p>

          {/* Animated underline */}
          <motion.div
            className="mx-auto mt-6 h-px rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)",
              maxWidth: 200,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* ── Sub-label ── */}
        <motion.h4
          className="mt-14 text-2xl font-semibold"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: "linear-gradient(90deg, #6366f1, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What I Provide
        </motion.h4>

        {/* ── Cards ── */}
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {serviceData.map((el, i) => (
            <motion.div key={i} variants={cardVariants}>
              <TiltCard dark={dark}>
                <div
                  className="relative overflow-hidden rounded-2xl p-7 h-full flex flex-col items-center text-center"
                  style={{
                    background: dark
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(15,23,42,0.6)",
                    border: dark
                      ? "1px solid rgba(99,102,241,0.15)"
                      : "1px solid rgba(99,102,241,0.12)",
                    backdropFilter: "blur(12px)",
                    boxShadow: dark
                      ? "0 4px 40px rgba(99,102,241,0.08), 0 1px 0 rgba(255,255,255,0.8) inset"
                      : "0 4px 40px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset",
                  }}
                >
                  {/* Shimmer border on hover */}
                  <ShimmerBorder dark={dark} />

                  {/* Badge */}
                  <Badge index={i} dark={dark} />

                  {/* Corner accent */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                    style={{
                      background: dark
                        ? "radial-gradient(circle at top right, rgba(99,102,241,0.12), transparent 70%)"
                        : "radial-gradient(circle at top right, rgba(99,102,241,0.1), transparent 70%)",
                    }}
                  />

                  {/* Icon */}
                  <IconBox img={el.img} dark={dark} />

                  {/* Name */}
                  <motion.h4
                    className="text-xl font-bold mt-2 mb-3"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color: dark ? "#111827" : "#f1f5f9",
                      letterSpacing: "-0.01em",
                    }}
                    whileHover={{ letterSpacing: "0.02em" }}
                    transition={{ duration: 0.3 }}
                  >
                    {el.name}
                  </motion.h4>

                  {/* Divider */}
                  <motion.div
                    className="w-10 h-0.5 rounded-full mb-4"
                    style={{
                      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    }}
                    whileHover={{ width: 60 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: dark ? "#4b5563" : "rgba(241,245,249,0.65)",
                    }}
                  >
                    {el.desc}
                  </p>

                  {/* CTA link */}
                  <motion.a
                    href="#portfolio"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: dark ? "#6366f1" : "#818cf8" }}
                    whileHover={{ gap: "10px" }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn More
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom floating stat strip ── */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { value: "10+", label: "Projects Delivered" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "3+", label: "Years Experience" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center"
              style={{
                background: dark
                  ? "rgba(99,102,241,0.06)"
                  : "rgba(99,102,241,0.07)",
                border: dark
                  ? "1px solid rgba(99,102,241,0.12)"
                  : "1px solid rgba(99,102,241,0.1)",
              }}
            >
              <div
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: dark ? "#6b7280" : "rgba(241,245,249,0.5)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;