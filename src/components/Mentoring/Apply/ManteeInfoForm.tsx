import ListBoxInput from '@/components/shared/input/ListBoxInput';
import TextAreaInput from '@/components/shared/input/TextAreaInput';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import { menteeStatusOption } from '@/contents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, '이름은 필수 입력입니다.'),
  phoneNumber: z
    .string()
    .min(1, '휴대전화 번호는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
  status: z.object({
    title: z.string(),
    value: z.string(),
  }),
  major: z.string().min(1, '전공은 필수 입력입니다.'),
  introduce: z.string().min(10, '최소한 10글자 이상은 입력해주세요.'),
});

export type ApplyFormAboutUser = z.infer<typeof schema>;

interface ManteeInfoFormProps {
  onNext: () => void;
}

export default function ManteeInfoForm({ onNext }: ManteeInfoFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyFormAboutUser>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = (data: any) => {
    console.log('ManteeForm Data', data);
    onNext();
  };
  const onError = (error: any) => {
    console.log('ManteeForm Info Error : ', error);
  };

  return (
    <>
      <h1 className="mt-20 text-center text-3xl font-semibold text-darkGray">멘토링에 앞서, 이승연님을 소개해보세요.</h1>
      <form className="pt-16 pb-20" onSubmit={handleSubmit(onSubmit, onError)}>
        <section className="space-y-5">
          <WrapLabel label="이름" id="name" moreInfo="실명으로 입력하세요." required errorMessage={errors.name?.message}>
            <TextInput register={register('name')} type="text" placeholder="이름을 입력하세요."></TextInput>
          </WrapLabel>
          <WrapLabel
            label="휴대전화 번호"
            id="phoneNumber"
            moreInfo="-빼고 입력하세요."
            required
            errorMessage={errors.phoneNumber?.message}
          >
            <TextInput register={register('phoneNumber')} type="text" placeholder="휴대전화 번호를 입력하세요."></TextInput>
          </WrapLabel>
          <WrapLabel label="현재 상태" id="status" required errorMessage={errors.status?.message}>
            <ListBoxInput
              list={menteeStatusOption}
              control={control}
              name={'status'}
              id={'status'}
              defaultValue={menteeStatusOption[0]}
            ></ListBoxInput>
          </WrapLabel>
          <WrapLabel label="전공" id="major" required errorMessage={errors.major?.message}>
            <TextInput register={register('major')} type="text" placeholder="전공을 입력해주세요."></TextInput>
          </WrapLabel>
          <WrapLabel label="자기소개" id="introduce" required errorMessage={errors.introduce?.message}>
            <TextAreaInput register={register('introduce')} placeholder="간단한 자기 소개 부탁드립니다." rows={5}></TextAreaInput>
          </WrapLabel>
        </section>
        <section className="flex items-center justify-center py-5">
          <button className="bg-lightPurple py-3 px-6 text-lg font-bold text-darkWhite" type="submit">
            다음 단계
          </button>
        </section>
      </form>
    </>
  );
}
