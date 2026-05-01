import { AnimatePresence , motion} from "framer-motion";
import { FiX } from "react-icons/fi";

export default function Overlay({ isOpen, onClose }) {

  const IsMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = IsMobile ? "95% 8%" : "50% 8%";

  return (
    <AnimatePresence>
      {isOpen && (
       <motion.div className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ clipPath: `circle(0% at ${origin})` }}
        animate={{ clipPath: `circle(150% at ${origin})` }}
        exit={{ clipPath: `circle(0% at ${origin})` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{backgroundColor:"rgba(0,0,0,0.9)"}}
       >

        <button 
        aria-label="Close Menu"
        className="absolute top-6 right-6 text-white text-3xl"
        onClick={onClose}
        >
          <FiX />
        </button>

        <ul className="space-y-6 text-center ">
          {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item , index) => (
            <motion.li key={item} className="text-2xl text-white cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            >
              <a href={`#${item.toLocaleLowerCase()}`}
              onClick={onClose}
              className="text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300"
              >
                {item}

              </a>
            </motion.li>
          ))}
        </ul>
       </motion.div>
      )}
    </AnimatePresence>
  )
}
