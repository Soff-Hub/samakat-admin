import React from 'react'

export default function Documentation() {
  return (
    <div>
      <div className='mb-5'>
        <p className='font-bold text-xl'>Komponentalardan foydalanish</p>
        <p>- Komponentalarni yaratishda <a href='https://mui.com/' target='blank' className='text-blue-400 underline'>MUI</a> kutubxonasi ishlatilgan
        </p>
      </div>

      <div>
        <div className='mb-4'>
          <p className='font-bold text-xl'>Page (navigatsiya sahifa) lar qo'shish</p>
          <p className='font-bold text-md'>1- page faylini yaratish</p>
          <p className='bg-gray-200 p-2'>
            <p className='text-yellow-500'>src</p>
            <p className='[30px] text-yellow-500'>├ views</p>
            <p className='pl-[30px] text-yellow-500'>├ home</p>
            <p className='pl-[60px] text-yellow-500'>├ pages</p>
            <p className='pl-[90px] text-green-500'>├ yangi-page.js</p>
          </p>
          <p>Yuqoridagi <span className='text-yellow-500'>pages</span> papkasiga o'z
            <span className='text-green-500'> yangi-page.js </span>
            faylini yarting va o'z page kodlaringizni yozing
          </p>
          <p>Huddi shunday <span className='text-yellow-500'>configs papkasida, navigationConfig.js</span>
            <span className='text-green-500'> navigationConfig </span>
            arrayda yozilgani kabi yangi navigatsiya yarating agar zarurat bo'lsa
          </p>
          <p className='font-bold text-md mt-5'>2- page uchun route yozish</p>
          <p className='bg-gray-200 p-2 mb-4'>
            <p className='text-yellow-500'>src</p>
            <p className='text-yellow-500'>├ configs</p>
            <p className='pl-[30px] text-yellow-500'>├ routes.config</p>
            <p className='pl-[60px] text-yellow-500'>├ routes.js</p>
            <p>Yuqoridagi routes.js faylidagi <span className='text-yellow-500'>adminActionRoutes </span>
              o'zgaruvchisiga, o'z yaratgan page faylini yo'lini quyigagicha ko'rastishingiz kerak bo'ladi
            </p>
          </p>
          <p className='text-orange-600 bg-gray-300 p-2'>
            export const adminActionRoutes = [ <br />
            <p className='pl-[20px]'>
              ... oldingi sahifa route lari <br />
              {`{`} <br />
              <p className='pl-[20px]'>key: 'yangi-page',</p>
              <p className='pl-[20px]'>path: '/yangi-page-path',</p>
              <p className='pl-[20px]'>component: React.lazy(() {`=>`} import('views/home/pages/yangi-page'))</p>
              {`}`}
            </p>
            ];
          </p>
        </div>
        <div className='mb-4'>
          <p className='font-bold text-xl'>API so'rovlarini yuborish</p>
          <p className='font-bold text-md'>
            Bunda barcha API so'rov funksiyalari yozilgan siz ENDPOINT yaratishingiz kerak va funksiyaga murojaat qilishingiz kerak</p>
          <p className='font-bold text-md'>1- Endpoind qanday yarataman?</p>
          <p className='bg-gray-200 p-2'>
            <p className='text-yellow-500'>src</p>
            <p className='[30px] text-yellow-500'>├ service</p>
            <p className='pl-[30px] text-yellow-500'>├ ApiEndpoints.js</p>
          </p>
          <p>Yuqoridagi <span className='text-yellow-500'>ApiEndpoints.js</span> faylidagi
            <span className='text-green-500'> API_ENDPOINTS </span>
            obektiga o'z endpintingizni qo'shing, misol uchun,<span className='text-yellow-500'> USERS: 'users'</span>
          </p>
          <p className='font-bold text-md mt-5'>2- Fuksiyaga murojaat qilish</p>
          <p className='text-orange-600 bg-gray-300 p-2'>
            async function getUsers() {`{`}  <br />
            <p className='pl-[20px]'>
              <p className='pl-[5px]'>await <span className='text-green-600'>Client</span>.<span className='text-blue-900'>get</span>
                (API_ENDPOINTS.USERS) <span className='text-green-700'>// agar post boladigan bolsa, Cilent.post(API_ENDPOINTS.USERS, {`{name: 'Doniyor'}`}) patch da ham shunday</span>
              </p>
              <p className='pl-[20px]'>.then({`data => console.log(data)`})</p>
              <p className='pl-[20px]'>.catch({`error => console.log(error)`})</p>
            </p>
            {`}`};
          </p>
        </div>
      </div>
    </div >
  )
}
