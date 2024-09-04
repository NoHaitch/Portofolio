import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import RecentPosts from '@/components/recent-activities'

export default function Home() {
  return (
    <section className='py-24'>
      <div className="container max-w-4xl">
      <RecentPosts />
      </div>
    </section>
  )
}
