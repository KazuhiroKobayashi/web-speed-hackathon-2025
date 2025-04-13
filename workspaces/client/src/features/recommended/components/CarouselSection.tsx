import { ElementScrollRestoration } from '@epic-web/restore-scroll';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { EpisodeItem } from '@wsh-2025/client/src/features/recommended/components/EpisodeItem';
import { SeriesItem } from '@wsh-2025/client/src/features/recommended/components/SeriesItem';
import { useCarouselItemWidth } from '@wsh-2025/client/src/features/recommended/hooks/useCarouselItemWidth';

interface Props {
  module: z.infer<typeof schema.getRecommendedModulesResponse>[number];
}

export const CarouselSection = ({ module }: Props) => {
  const { ref: containerRefForItemWidth, width: itemWidth } = useCarouselItemWidth();

  return (
    <>
      <div className="w-full">
        <h2 className="mb-[16px] w-full text-[22px] font-bold">{module.title}</h2>
        <div
          key={module.id}
          ref={containerRefForItemWidth}
          className="scroll-p-l-[24px] relative mx-[-24px] flex snap-x snap-mandatory flex-row gap-x-[12px] overflow-x-auto overflow-y-hidden pl-[24px] pr-[56px]"
          data-scroll-restore={`carousel-${module.id}`}
        >
          {module.items.map((item) => (
            <div key={item.id} className="shrink-0 grow-0 snap-start" style={{ width: `${itemWidth}px` }}>
              {item.series != null ? <SeriesItem series={item.series} /> : null}
              {item.episode != null ? <EpisodeItem episode={item.episode} /> : null}
            </div>
          ))}
        </div>
      </div>

      <ElementScrollRestoration direction="horizontal" elementQuery={`[data-scroll-restore="carousel-${module.id}"]`} />
    </>
  );
};
