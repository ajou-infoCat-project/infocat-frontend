import { jobCategoryOption, JobCategoryOptionMain, JobCategoryOptionSub } from '@/contents';
import cls from '@/utils/cls';
import { useEffect, useRef, useState } from 'react';

interface CategoryInputParams {
  value: { subCategory: string; subValue: string };
  onChange: (value: { subCategory: string; subValue: string }) => void;
}

export default function CategoryInput({ value, onChange }: CategoryInputParams) {
  const [mainCategory, setMainCategory] = useState<string>();
  const disclosureRef = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   const { current } = disclosureRef;
  //   if (current == null) return;

  //   console.log('계속 오냐?');

  //   let beforeScrollHeight = 0;
  //   const observer = new ResizeObserver((entries) => {
  //     for (let entry of entries) {
  //       let nowScrollHeight = entry.target.scrollHeight;
  //       if (beforeScrollHeight != nowScrollHeight)
  //         current.style.setProperty('--content-height', nowScrollHeight.toString() + 'px'), (beforeScrollHeight = nowScrollHeight);
  //     }
  //   });
  //   observer.observe(current);
  // }, [disclosureRef]);

  useEffect(() => {
    const { current } = disclosureRef;
    current?.style.setProperty('--content-height', current.scrollHeight.toString() + 'px');
  }, [mainCategory]);

  const onMain = (main: JobCategoryOptionMain) => {
    setMainCategory(main.mainCategory);
    onChange(main.options[0]);
  };

  const onSub = (sub: JobCategoryOptionSub) => {
    onChange(sub);
  };

  return (
    <div className="h-full w-full">
      <section className="flex items-center gap-2 pb-2">
        {jobCategoryOption.map((main) => (
          <button
            className={cls(
              'border bg-white py-1.5 px-3  text-base',
              main.mainCategory === mainCategory ? 'border-darkPurPle text-darkPurPle' : 'border-lightGray text-darkGray'
            )}
            onClick={() => onMain(main)}
            key={main.mainCategory}
            type="button"
          >
            {main.mainCategory}
          </button>
        ))}
      </section>
      <section
        className={cls('overflow-hidden transition-all duration-300', mainCategory ? 'max-h-[var(--content-height)]' : 'max-h-0')}
        ref={disclosureRef}
      >
        <div className="flex flex-wrap items-center gap-2 bg-darkWhite p-2">
          {mainCategory &&
            jobCategoryOption
              .filter((main) => main.mainCategory === mainCategory)[0]
              .options.map((subOption) => (
                <button
                  className={cls(
                    'border bg-white py-1.5 px-3 text-base',
                    subOption.subCategory === value.subCategory ? 'border-darkPurPle text-darkPurPle' : 'border-lightGray text-darkGray'
                  )}
                  onClick={() => onSub(subOption)}
                  key={subOption.subValue}
                  type="button"
                >
                  {subOption.subCategory}
                </button>
              ))}
        </div>
      </section>
    </div>
  );
}