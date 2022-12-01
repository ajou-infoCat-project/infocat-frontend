import { MentoringCardParams } from '@/api/mentoring/mentoringListSearchApi';
import yearToRank from '@/utils/yearToRank';
import { PropsWithChildren } from 'react';

export default function MentoringCard({ title, role, years, company, stars, image }: MentoringCardParams) {
  return (
    <article className="h-full w-full max-w-[22rem] rounded-md bg-white p-6 shadow-md sm:p-6">
      <header className="flex items-center space-x-4">
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-lightGray"></div>
        <h3 className="text-lg leading-6">{title}</h3>
      </header>
      <section className="space-y-2 pl-3 pt-4 pb-0 text-base">
        <LabelContent title="직무">{role}</LabelContent>
        <LabelContent title="경력">{yearToRank(years)}</LabelContent>
        <LabelContent title="현직">{company}</LabelContent>
        <LabelContent title="평가">{stars} / 5.0</LabelContent>
      </section>
    </article>
  );
}

function LabelContent({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex justify-start space-x-4">
      <h5 className="text-[#d1cfcf]">{title}</h5>
      <p className="text-[#8d8d8d]">{children}</p>
    </div>
  );
}
