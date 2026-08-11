import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="band pt-48">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="display my-6 text-[clamp(2.2rem,5vw,3.8rem)]">That page isn&apos;t here</h1>
        <p className="lede">The link may be out of date. Try the projects, or tell us what you were looking for.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="btn"><span>View projects</span></Link>
          <Link href="/" className="btn btn-ghost"><span>Back to home</span></Link>
        </div>
      </div>
    </section>
  );
}
