import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { CarouselSection } from '@wsh-2025/client/src/features/recommended/components/CarouselSection';
import { JumbotronSection } from '@wsh-2025/client/src/features/recommended/components/JumbotronSection';

interface Props {
  module: z.infer<typeof schema.getRecommendedModulesResponse>[number];
}

export const RecommendedSection = ({ module }: Props) => {
  if (module.type === 'jumbotron') {
    return <JumbotronSection module={module} />;
  } else {
    return <CarouselSection module={module} />;
  }
};
