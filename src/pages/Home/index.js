import React, { Fragment } from 'react'
import FeaturedProducts from './jsonapi'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

export default () => {
  return (
    <Fragment>
      <div className={`container-fluid`}>
        <div className={`container`}>
          <div className={`featured-products`}>
            <div className={`row`}>
              <div className="col-md-12">
                <h2 className="h1 text-center line mb-4">Featured products</h2>
              </div>
            </div>
            <div className={`row`}>
            <FeaturedProducts />
            </div>
          </div>
        </div>
      </div>
      <div className="testimonial container-fluid bg-primary">
        <div className="container">
          <div className="text-center row">
            <div className="col-10 offset-1">
              <p className="testimonial__text h2">"Slow-carb paleo bicycle rights bushwick. Tote bag mustache man bun swag, tbh chartreuse synth stumptown portland cray."</p>
              <div className="testimonial__rating mt-3 mb-4">
                <FaStar size={20}/>
                <FaStar size={20}/>
                <FaStar size={20}/>
                <FaStar size={20}/>
                <FaStarHalfAlt size={20}/>
              </div>
              <p>Nikola White, customer</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
