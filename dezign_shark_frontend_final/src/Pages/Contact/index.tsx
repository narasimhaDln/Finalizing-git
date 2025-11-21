
import {  contactsharkbg } from '../../assets'
import Locations from './Locations'
import ContactusMap from './ContactusMap'
import ContactUsForm from './ContactUsForm'
import Breadcrumb from '../../Components/Breadcrumb'

const index = () => {
  return (
    <div>
        <Breadcrumb
        title="Contact"
        subtitle=""
        backgroundImage={contactsharkbg}
        overlayText="Contact Now"
      />
      <Locations/>
      <ContactUsForm/>
      <ContactusMap/>
      
    </div>
  )
}

export default index
