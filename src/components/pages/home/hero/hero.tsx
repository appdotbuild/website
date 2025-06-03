import Image from 'next/image';

import { Button } from '@/components/shared/button';
import CodeBlock from '@/components/shared/content/code-block';
import Link from '@/components/shared/link';

import { cn } from '@/lib/utils';

import { ROUTE } from '@/constants/route';

import heroBgIllustration from '@/images/pages/home/hero/hero-bg.jpg';
import heroIllustrationMd from '@/images/pages/home/hero/illustration-md.jpg';
import heroIllustration from '@/images/pages/home/hero/illustration.jpg';

import bgPattern1 from '@/svgs/pages/home/hero/bg-pattern-1.svg';
import bgPattern2 from '@/svgs/pages/home/hero/bg-pattern-2.svg';
import bgPattern3 from '@/svgs/pages/home/hero/bg-pattern-3.svg';
import bgPattern4 from '@/svgs/pages/home/hero/bg-pattern-4.svg';
import GithubIcon from '@/svgs/shared/menu/github.inline.svg';

function DecorationSquare({ className }: { className?: string }) {
  return <span className={cn('h-1.5 w-1.5 rotate-45 bg-[#808080]', className)} aria-hidden />;
}

function DecorationPlus({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative h-0.5 w-3 bg-black after:absolute after:-top-[5px] after:left-[5px] after:h-3 after:w-0.5 after:bg-black',
        className,
      )}
      aria-hidden
    />
  );
}

function Hero() {
  return (
    <section className="hero relative grow overflow-hidden px-safe">
      <div className="lg:container relative flex flex-col pb-28 pt-[125px] md:pb-40 md:pt-[138px] lg:pb-44 lg:pt-[152px] xl:max-w-[1280px] xl:px-8 xl:pb-48 xl:pt-[156px]">
        <div className="relative px-5 md:mx-auto md:max-w-[514px] md:px-0 lg:max-w-[640px]">
          <h1 className="relative mx-auto text-32 font-semibold leading-dense -tracking-tighter text-foreground md:max-w-[448px] md:text-36 lg:max-w-[578px] lg:text-48 xl:text-60">
            An open-source <br className="block md:hidden xl:block" />
            AI agent that builds <br className="block md:hidden xl:block" />
            full-stack apps
            <span
              className="absolute -top-[49px] left-0 h-9 w-2 bg-orange md:-top-[62px] md:h-12 md:w-3 lg:-top-[72px] lg:h-14 lg:w-4"
              aria-hidden
            />
          </h1>
          <div className="relative mt-[38px] pb-14 md:mt-12 md:pb-[70px] lg:mt-14 lg:pb-[78px] xl:mt-16 xl:pb-[85px]">
            <div className="relative">
              <CodeBlock
                className="rounded-none border-0 pb-5 md:pb-0"
                code={'npx @app.build/cli'}
                language="json"
                isCustom
              />
              <span
                className="absolute left-1/2 top-0 -ml-[50vw] h-px w-screen border-t border-dashed border-black/20"
                aria-hidden
              />
              <span
                className="absolute bottom-0 left-1/2 -ml-[50vw] h-px w-screen border-t border-dashed border-black/20"
                aria-hidden
              />
              <DecorationPlus className="absolute -left-1.5 top-0 z-10" />
              <DecorationPlus className="absolute -right-1.5 bottom-0 z-10" />
              <DecorationSquare className="absolute -bottom-0.5 -left-[98px] z-10 md:-left-[66px] lg:-left-[98px]" />
              <DecorationSquare className="absolute -right-[98px] -top-0.5 z-10 md:-right-[66px] lg:-right-[98px]" />
            </div>

            <p className="mt-20 px-5 font-mono text-16 leading-normal -tracking-tightest md:mt-32 md:px-8 lg:mt-[135px] lg:px-8 lg:text-left lg:text-18 xl:mt-36">
              <span className="bg-orange pb-px md:pb-1">app.build generates</span> real apps from scratch on top of the <a href="http://neon.com">Neon</a> platform. It uses Neon Postgres,
              Neon Auth and serves as a reference implementation for any codegen product.

              It is fully open source, local-first,
              and built for developers. We empower people to bring their own models and build real
              apps in minutes.
            </p>

            <div className="mt-8 flex flex-col items-center gap-x-6 gap-y-2.5 px-5 md:mt-6 md:flex-row md:px-8 lg:mt-10 lg:px-8">
              <Button className="w-full gap-x-1.5 md:w-auto" variant="gradient" size="lg" asChild>
                <Link href={ROUTE.agentGithub} target="_blank">
                  <GithubIcon className="size-3.5 lg:size-4" aria-hidden />
                  Agent code
                </Link>
              </Button>
              <Button className="w-full gap-x-1.5 md:w-auto" variant="gradient" size="lg" asChild>
                <Link href={ROUTE.platformGithub} target="_blank">
                  <GithubIcon className="size-3.5 lg:size-4" aria-hidden />
                  CLI & platform code
                </Link>
              </Button>
            </div>

            <span
              className="absolute -left-24 top-0 h-full w-px border-l border-dashed border-black/20 md:-left-16 lg:-left-24"
              aria-hidden
            />
            <span
              className="absolute -right-24 top-0 h-full w-px border-r border-dashed border-black/20 md:-right-16 lg:-right-24"
              aria-hidden
            />
            <span
              className="absolute left-0 top-0 h-full w-px border-l border-dashed border-black/20"
              aria-hidden
            />
            <span
              className="absolute right-0 top-0 h-full w-px border-r border-dashed border-black/20"
              aria-hidden
            />

            <Image
              className="absolute -bottom-16 -right-[94px] object-cover md:bottom-0 md:h-[382px] lg:-bottom-3.5 lg:h-auto xl:bottom-0"
              src={bgPattern1}
              width={94}
              height={416}
              alt=""
            />
            <Image
              className="absolute -left-full top-0 object-cover md:h-[66px] lg:h-auto"
              src={bgPattern2}
              width={544}
              height={83}
              alt=""
            />
          </div>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none relative max-w-full select-none py-4 md:mx-auto md:max-w-[640px] md:py-0 lg:max-w-[832px]">
            <Image
              className="relative z-10 mx-auto w-[calc(100%-40px)] md:hidden"
              src={heroIllustrationMd}
              width={324}
              height={321}
              alt=""
              quality={99}
              priority
            />
            <Image
              className="relative z-10 mx-auto hidden md:block md:max-w-[592px] md:py-6 lg:max-w-full lg:py-8"
              src={heroIllustration}
              width={770}
              height={510}
              alt=""
              quality={99}
              priority
            />
            <Image
              className="absolute inset-0 z-[1] min-h-full object-cover"
              src={heroBgIllustration}
              width={832}
              height={572}
              alt=""
              quality={99}
              priority
            />

            <span
              className="absolute left-1/2 top-0 -ml-[50vw] h-px w-screen bg-black/15"
              aria-hidden
            />
            <span
              className="absolute bottom-0 left-1/2 -ml-[50vw] h-px w-screen bg-black/15"
              aria-hidden
            />
            <span
              className="absolute -left-60 top-0 h-full w-px border-l border-dashed border-black/20"
              aria-hidden
            />
            <span
              className="absolute -right-32 top-0 h-full w-px border-r border-dashed border-black/20"
              aria-hidden
            />
            <span
              className="absolute -left-[100vw] bottom-[168px] h-px w-screen border-t border-dashed border-black/20"
              aria-hidden
            />
            <span
              className="absolute -right-[100vw] bottom-56 h-px w-screen border-t border-dashed border-black/20"
              aria-hidden
            />
            <span
              className="absolute -right-[100vw] bottom-[330px] h-px w-screen border-t border-dashed border-black/20"
              aria-hidden
            />

            <DecorationPlus className="absolute -left-[245px] bottom-[167px] z-10" />
            <DecorationPlus className="absolute -right-[134px] bottom-[329px] z-10" />
            <DecorationSquare className="absolute -bottom-0.5 -left-[242px] z-10" />

            <Image
              className="absolute -right-[86%] bottom-[226px] object-cover lg:-right-[66%]"
              src={bgPattern3}
              width={419}
              height={104}
              alt=""
            />
            <Image
              className="absolute -left-[544px] bottom-px h-[168px] object-cover"
              src={bgPattern4}
              width={304}
              height={159}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
