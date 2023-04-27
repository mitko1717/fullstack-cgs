import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import 'swiper/swiper-bundle.min.css';
import { Navigation, EffectCards } from 'swiper';
import { ITodo } from '../../../../interfaces/interface';
import { TodoElementContainer } from '../TodoElement/TodoElement.component';
import 'swiper/swiper-bundle.css';
import './styles.css';

interface ISlider {
  items: ITodo[];
}

export const TodoSlider = ({ items }: ISlider) => (
  <Swiper
    navigation
    spaceBetween={50}
    slidesPerView={1}
    initialSlide={1}
    cardsEffect={{
      rotate: false,
      perSlideOffset: 70,
      slideShadows: false
    }}
    effect="cards"
    grabCursor
    pagination
    modules={[EffectCards, Navigation]}
  >
    {items.map((item) => (
      <SwiperSlide key={item.id}>
        <TodoElementContainer item={item} />
      </SwiperSlide>
    ))}
  </Swiper>
);
