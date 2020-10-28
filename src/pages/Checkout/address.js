import React from 'react'
import PropTypes from 'prop-types'
import usStates from '../../utils/us-states.json'

const Address = ({elementName, handleChange, value }) => (
  <div>
    <div className="form-group">
      <label htmlFor="inputAddress">Address</label>
      <input
        type="text"
        name={`${elementName}[addressLine1]`}
        className="form-control"
        id={`${elementName}Address1`}
        value={value.address_line1}
        placeholder="1234 Main St"
        onChange={handleChange(elementName, 'address_line1')}
      />
    </div>
    <div className="form-group">
      <label htmlFor="inputAddress2">Address 2</label>
      <input type="text" name={`${elementName}[addressLine2]`} className="form-control" id={`${elementName}Address2`}
             onChange={handleChange(elementName, 'address_line2')} onBlur={handleChange(elementName, 'address_line2')}
             value={value.address_line2} placeholder="Apartment, studio, or floor"/>
    </div>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="inputCity">City</label>
        <input type="text" name={`${elementName}[locality]`} className="form-control" id={`${elementName}Locality`}
               onChange={handleChange(elementName, 'locality')} onBlur={handleChange(elementName, 'locality')}
               value={value.locality}/>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="inputState">State</label>
        <select id="inputState" name={`${elementName}[administrativeArea]`} className="form-control"
                value={value.administrative_area || `_na`} onChange={handleChange(elementName, 'administrative_area')}>
          <option value={`_na`}>Choose...</option>
          {usStates.map(state => (
            <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group col-md-2">
        <label htmlFor="inputZip">Zip</label>
        <input type="text" name={`${elementName}[postalCode]`} className="form-control"
               onChange={handleChange(elementName, 'postal_code')} onBlur={handleChange(elementName, 'postal_code')}
               id={`${elementName}PostalCode`} value={value.postal_code}/>
      </div>
    </div>
    <input type={`hidden`} value={`US`} name={`${elementName}[countryCode]`}/>
  </div>
)
Address.propTypes = {
  elementName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
  }),
}
export default Address
