'use client';

import Image from "next/image";
interface Props {
  avatarSrc: string | null | undefined
}
const Avatar: React.FC<Props> = ({ avatarSrc }) => {
  return (
    <Image className='rounded-full' height='30' width='30' alt='avatar' src={avatarSrc || '/images/placeholder.jpg'} />
  )
}

export default Avatar