import React from "react"
import { motion } from "framer-motion"
import { CaretRight } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

const posts = [
  {
    id: "6-principles-software-engineering",
    title: "6 Principles of Software Engineering You May Know But Don't Use",
    description:
      "The art of writing clean code is not just a task, but an essential skill that every programmer should passionately embrace.",
    date: "June 17, 2024",
    readTime: "13 min read",
    views: "613 views",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "building-my-monorepo",
    title: "Building My Monorepo: A Journey of Modular Systems & Subtrees",
    description:
      "I set myself a challenge to coordinate full-stack architectures into a centralized, deterministic development pipeline.",
    date: "February 10, 2024",
    readTime: "4 min read",
    views: "748 views",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
]

export const LatestPosts: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="py-12"
    >
      {/* Section Header */}
      <p className="text-xs sm:text-sm font-semibold text-violet-400 mb-1">
        Writing
      </p>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight">
        Latest posts
      </h2>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.12 }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 20 } }}
          >
            <div className="group block rounded-2xl border border-[#27272a] bg-[#141414] hover:border-violet-500/60 hover:shadow-[0_12px_30px_-10px_rgba(124,58,237,0.18)] transition-all duration-300 overflow-hidden shadow-xl cursor-pointer">
              {/* Thumbnail Image */}
              <div className="h-48 sm:h-52 overflow-hidden relative bg-[#1c1c20]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                {/* Meta info */}
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2.5 font-normal">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{post.views}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-violet-300 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 font-normal">
                  {post.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Centered See All Posts Button */}
      <div className="flex justify-center">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#2e2e2e] bg-[#141414] hover:bg-[#1f1f1f] text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-all duration-200 shadow-sm group"
          >
            <span>See all posts</span>
            <CaretRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default LatestPosts
