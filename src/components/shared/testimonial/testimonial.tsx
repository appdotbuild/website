import Image, { StaticImageData } from 'next/image';

import { cn } from '@/lib/utils';

import blockquoteIcon from '@/images/shared/testimonial/blockquote.png';

type TestimonialProps = {
  children: React.ReactNode;
  author: {
    name: string;
    title: string;
    image: StaticImageData;
  };
  className?: string;
};

function Testimonial({ children, author, className }: TestimonialProps) {
  return (
    <section className={cn('testimonial px-safe', className)}>
      <div className="container max-w-5xl">
        <figure className="relative md:pl-16 md:pr-8 lg:px-16">
          <blockquote>
            <p className="text-pretty text-20 font-medium leading-snug -tracking-tightest text-gray-70 md:text-24 lg:text-28 [&_span]:font-title [&_span]:italic [&_span]:tracking-tight [&_span]:text-white">
              {children}
            </p>
          </blockquote>
          <figcaption className="mt-5 flex items-center justify-start gap-3 md:mt-4">
            <div className="flex items-center">
              <Image
                className="size-8 rounded-full md:size-9 lg:size-11"
                src={author.image}
                alt=""
                width={44}
                height={44}
                sizes="88px"
                quality={100}
              />
            </div>
            <p className="text-15 font-light leading-snug -tracking-tighter text-gray-60 md:text-16 lg:text-18">
              <span className="font-medium text-white">{author.name}</span> – {author.title}
            </p>
          </figcaption>
          <div className="pointer-events-none absolute -top-14 left-0 size-8 md:top-0" aria-hidden>
            <Image src={blockquoteIcon} alt="" width={32} height={32} sizes="64px" quality={100} />
            <span className="absolute -left-5 top-0 h-[50px] w-[70px] bg-[radial-gradient(50%_50%_at_50%_50%,#CCB493_39.28%,rgba(60,54,45,0)_100%)] blur-3xl md:-left-6 md:-top-3" />
          </div>
        </figure>
      </div>
    </section>
  );
}

export default Testimonial;
