import * as schema from '@wsh-2025/schema/src/api/schema';
import { DateTime } from 'luxon';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { z } from 'zod';

import { ProgramDetailDialog } from '@wsh-2025/client/src/pages/timetable/components/ProgramDetailDialog';
import { useColumnWidth } from '@wsh-2025/client/src/pages/timetable/hooks/useColumnWidth';
import { useSelectedProgramId } from '@wsh-2025/client/src/pages/timetable/hooks/useSelectedProgramId';

interface Props {
  height: number;
  program: z.infer<typeof schema.getTimetableResponse>[number];
}

type Status = 'broadcasting' | 'archived' | 'notStarted';

const getStatus = (startAt: string, endAt: string): Status => {
  const now = DateTime.now().toMillis();
  const start = DateTime.fromISO(startAt).toMillis();
  const end = DateTime.fromISO(endAt).toMillis();
  if (start <= now && now < end) {
    return 'broadcasting';
  }
  if (end <= now) {
    return 'archived';
  }
  return 'notStarted';
};

const getDelay = (startAt: string, endAt: string): number => {
  const now = DateTime.now().toMillis();
  const start = DateTime.fromISO(startAt).toMillis();
  const end = DateTime.fromISO(endAt).toMillis();
  if (start <= now && now < end) {
    return Math.max(end - now, 0);
  }
  if (end <= now) {
    return 0;
  }
  return Math.max(start - now, 0);
};

export const Program = ({ height, program }: Props): ReactElement => {
  const width = useColumnWidth(program.channelId);

  const [selectedProgramId, setProgram] = useSelectedProgramId();
  const shouldProgramDetailDialogOpen = program.id === selectedProgramId;
  const onClick = () => {
    setProgram(program);
  };

  const [status, setStatus] = useState<Status>(getStatus(program.startAt, program.endAt));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (status === 'archived') {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const newStatus = getStatus(program.startAt, program.endAt);
    const delay = getDelay(program.startAt, program.endAt);
    timeoutRef.current = setTimeout(() => {
      setStatus(newStatus === 'broadcasting' ? 'archived' : 'broadcasting');
    }, delay);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status]);

  const titleRef = useRef<HTMLDivElement | null>(null);

  const [shouldImageBeVisible, setShouldImageBeVisible] = useState<boolean>(false);
  useEffect(() => {
    if (titleRef.current === null) {
      return;
    }
    const imageHeight = width * 9 / 16;
    const titleHeight = titleRef.current.clientHeight;
    const hasSpaceForImage = imageHeight <= height - titleHeight;
    if (hasSpaceForImage !== shouldImageBeVisible) {
      setShouldImageBeVisible(hasSpaceForImage);
    }
  }, [height]);

  return (
    <>
      <button
        className={`w-auto border-[1px] border-solid border-[#000000] ${status === 'broadcasting' ? 'bg-[#FCF6E5]' : 'bg-[#212121]'} px-[12px] py-[8px] text-left ${status === 'archived' ? 'opacity-50 hover:brightness-200' : 'opacity-100 hover:brightness-125'}`}
        style={{ height: `${height}px`, width: `${width}px` }}
        type="button"
        onClick={onClick}
      >
        <div className="flex size-full flex-col overflow-hidden">
          <div ref={titleRef} className="mb-[8px] flex flex-row items-start justify-start">
            <span
              className={`mr-[8px] shrink-0 grow-0 text-[14px] font-bold ${status === 'broadcasting' ? 'text-[#767676]' : 'text-[#999999]'}`}
            >
              {DateTime.fromISO(program.startAt).toFormat('mm')}
            </span>
            <div
              className={`grow-1 shrink-1 line-clamp-3 overflow-hidden text-ellipsis text-[14px] font-bold ${status === 'broadcasting' ? 'text-[#212121]' : 'text-[#ffffff]'}`}
            >
              {program.title}
            </div>
          </div>
          {shouldImageBeVisible && (
            <div className="w-full">
              <img
                alt=""
                className="pointer-events-none aspect-video w-full rounded-[8px] border-[2px] border-solid border-[#FFFFFF1F]"
                src={program.thumbnailUrl}
              />
            </div>
          )}
        </div>
      </button>
      <ProgramDetailDialog isOpen={shouldProgramDetailDialogOpen} program={program} />
    </>
  );
};
