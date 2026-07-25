import { motion } from 'framer-motion'

export default function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer"
    >
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
