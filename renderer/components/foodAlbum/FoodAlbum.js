//components
import { useEffect } from 'react'
import Link from 'next/link'
import Menu from '../../components/customer/Menu'
import CartStatusModal from '../../components/customer/CartStatusModal'
//component

//provider
import { AuthProvider } from '../../context/AuthContext'
import { SharedProvider, useSharedContext } from '../../context/SharedContext'
import { OrderProvider, useOrderContext } from '../../context/OrderContext'
import { MenuProvider } from '../../context/MenuContext'
import { ExtraProvider } from '../../context/ExtraContext'

const FoodAlbum = () => {
  return (
    <div className="bg-[#1c1c1c] pb-5 text-center text-3xl font-bold uppercase text-[#c62c2c] xl:text-6xl">
      <div>Speisekarte</div>
      <Link href="/menu">
        <button
          //  onClick={toggleShowMore}

          onClick={() => {}}
          className="text-md mx-auto mt-5 block rounded-lg bg-[#c62c2c] p-4 text-white xl:text-3xl"
        >
          Digitale Speisekarte
        </button>
      </Link>
    </div>
  )
}

const Wrapper = () => {
  const { cartModalStatus, setCartModalStatus } = useSharedContext()
  const { orderItems } = useOrderContext()
  useEffect(() => {
    if (orderItems.length === 0) {
      setCartModalStatus(false)
    }
  }, [orderItems])
  if (cartModalStatus && orderItems.length) {
    return <CartStatusModal />
  } else {
    return <Menu />
  }
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default FoodAlbum

// import React from 'react'
// // import MenuPage from '../../pages/menu/index'

// function FoodAlbum() {
//   return (
//     <>
//       {/* <MenuPage /> */}
//     </>
//   )
// }

// export default FoodAlbum

// import { useState, useEffect } from 'react'

// import styles from '../../styles/gallery.module.css'

// import { BsFillArrowRightCircleFill } from 'react-icons/bs'
// import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

// const FoodAlbum = () => {
//   const [index, setIndex] = useState(0)

//   let menuGallery = [
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856127/samples/food/ilovepdf_pages-to-jpg/page-0002_bizkpj.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856132/samples/food/ilovepdf_pages-to-jpg/page-0001_qri3ll.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856134/samples/food/ilovepdf_pages-to-jpg/page-0010_kx9rns.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856132/samples/food/ilovepdf_pages-to-jpg/page-0003_n5havp.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856129/samples/food/ilovepdf_pages-to-jpg/page-0004_q5mwin.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856130/samples/food/ilovepdf_pages-to-jpg/page-0005_sn7eov.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856134/samples/food/ilovepdf_pages-to-jpg/page-0006_xqeh3t.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856134/samples/food/ilovepdf_pages-to-jpg/page-0007_fy3shz.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856129/samples/food/ilovepdf_pages-to-jpg/page-0009_tpmhpp.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856134/samples/food/ilovepdf_pages-to-jpg/page-0010_kx9rns.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856133/samples/food/ilovepdf_pages-to-jpg/page-0011_g7lzdp.jpg',
//     'https://res.cloudinary.com/ingootag-com/image/upload/v1649856129/samples/food/ilovepdf_pages-to-jpg/page-0009_tpmhpp.jpg',
//   ]
//   useEffect(() => {
//     document.body.style.overflow = 'visible'
//   }, [])

//   const onClickNext = () => {
//     if (index + 1 === menuGallery.length) {
//       setIndex(0)
//     } else {
//       setIndex(index + 1)
//     }
//   }
//   const onClickPrevious = () => {
//     if (index - 1 === -1) {
//       setIndex(menuGallery.length - 1)
//     } else {
//       setIndex(index - 1)
//     }
//   }
//   return (
//     <div id="speisen" className="">
//       <div className="bg-white py-5 text-center text-3xl font-bold uppercase text-[#c62c2c] xl:text-6xl">
//         Speisen
//       </div>
//       <div className="container bg-white">
//         <img src={menuGallery[index]} className="h-[610px] w-full" />
//       </div>
//       <div>
//         <div className="bg-white">
//           <div className={styles.buttons}>
//             <BsFillArrowLeftCircleFill
//               className={styles.button}
//               onClick={onClickPrevious}
//             />
//             <p className={styles.pageNumber}>{index + 1}</p>
//             <BsFillArrowRightCircleFill
//               className={styles.button}
//               onClick={onClickNext}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FoodAlbum
