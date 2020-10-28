import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import usStates from '../../utils/us-states.json'

const Address = ({
  elementName,
  setAddress,
  address
}) => {
  const [addressLine1, setAddressLine1] = useState(address.address_line1);
  const [addressLine2, setAddressLine2] = useState(address.address_line2);
  const [city, setCity] = useState(address.locality);
  const [state, setState] = useState(address.administrative_area);
  const [postalCode, setPostalCode] = useState(address.postal_code);

  useEffect(() => {
    setAddressLine1(address.address_line1);
    setAddressLine2(address.address_line2);
    setCity(address.locality);
    setState(address.administrative_area);
    setPostalCode(address.postal_code);
  }, [address])
  useEffect(() => {
    setAddress({
      address_line1: addressLine1,
      address_line2: addressLine2,
      locality: city,
      administrative_area: state,
      postal_code: postalCode,
    })
  }, [addressLine1, addressLine2, city, state, postalCode]);

  return (
    <div>
      <div className="form-group">
        <label htmlFor="inputAddress">Address</label>
        <input
          type="text"
          name={`${elementName}[address_line1]`}
          className="form-control"
          id={`${elementName}Address1`}
          value={addressLine1}
          placeholder="1234 Main St"
          onChange={e => setAddressLine1(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="inputAddress2">Address 2</label>
        <input type="text" name={`${elementName}[address_line2]`} className="form-control" id={`${elementName}Address2`}
               onChange={(e) => setAddressLine2(e.target.value)}
               value={addressLine2} placeholder="Apartment, studio, or floor"/>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputCity">City</label>
          <input type="text" name={`${elementName}[locality]`} className="form-control" id={`${elementName}Locality`}
                 onChange={e => setCity(e.target.value)}
                 value={city}/>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputState">State</label>
          <select id="inputState" name={`${elementName}[administrative_area]`} className="form-control" value={state || `_na`} onChange={e => setState(e.target.value)}>
            <option value={`_na`}>Choose...</option>
            {usStates.map(state => (
              <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="inputZip">Zip</label>
          <input type="text" name={`${elementName}[postal_code]`} className="form-control"
                 onChange={e => setPostalCode(e.target.value)}
                 id={`${elementName}PostalCode`} value={postalCode}/>
        </div>
      </div>
      <input type={`hidden`} value={`US`} name={`${elementName}[country_code]`}/>
    </div>
  )
}
Address.propTypes = {
  elementName: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  address: PropTypes.shape({
    address_line1: PropTypes.string,
    address_line2: PropTypes.string,
    locality: PropTypes.string,
    administrative_area: PropTypes.string,
    postal_code: PropTypes.string,
    country_code: PropTypes.string
  })
}
export default Address
