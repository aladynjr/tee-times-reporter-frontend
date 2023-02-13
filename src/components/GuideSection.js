import React,{useEffect, useState} from 'react'
import Guide1 from '../assets/images/guide-1.svg'
import Guide2 from '../assets/images/guide-2.svg'
import Guide3 from '../assets/images/guide-3.svg'
import Guide4 from '../assets/images/guide-4.svg'

function GuideSection() {
    const guideSteps = [
        {
          title: 'Insert Preferences',
          description: 'Insert your booking preferences (course, date, time, group size)',
          image: Guide1
    
        },
        {
          title: 'We’ll Start Looking',
          description: 'We will constantly crawl the tee sheets at your desired courses waiting for cancellations.',
          image: Guide2
        },
        {
          title: 'Get Alerted',
          description: 'Once a tee time becomes available, we’ll text you right away with a link to book.',
          image: Guide3
        },
        {
          title: 'Book Tee Time',
          description: 'Most tee times are snagged within minutes so book as quickly as possible.',
          image: Guide4
        }
      ]
    //are we in resolution less than 1200px or not ? 
    const [mobile, setMobile] = useState(false)
    useEffect(()=>{
      if (window.innerWidth < 1200) {
        setMobile(true)
      } else {
        setMobile(false)
      }
    },[window.innerWidth])
    
  return (
    <div>
          <div style={{ height: '50px', background: "white", borderTopRightRadius: "100%", borderTopLeftRadius: '100%' }} ></div>

<div style={{ background: 'white', paddingBottom:'75px' }} >


<div>
  <div className=' alert-title ' style={{ width: 'fit-content', margin: 'auto', paddingBlock:'75px' }} > How It Works </div>


  <div>
    {guideSteps.map((step, index) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '90%', maxWidth: '1400px', margin: 'auto', paddingTop: '60px',height:'fit-content', flexDirection: (((index + 1) % 2 == 0) && !mobile) && 'row-reverse' }} className='flex-col-reverse xl:flex-row hero-section-mobile guide-section' >
          <img src={step.image} alt="How it works" style={{ width: '90%', maxWidth: '400px', maxHeight: '30%', marginTop: mobile && index!=0 && '40px' }} />


          <div>
            <div style={{ display: 'flex', alignItems: 'center' }} >
              <div className='guide-numbering'  >{'0' + (index + 1)}</div>

              <div className=' alert-title ' style={{ fontSize: '34px', marginLeft: '-15px', marginBottom: '-15px' }} > {step.title} </div>
            </div>
            <div className=' guide-description'  >{step.description}</div>
          </div>


        </div>
      )
    })}


  </div>
</div> 

</div>
<div style={{ height: '50px', background: "white", borderBottomRightRadius: "100%", borderBottomLeftRadius: '100%' }} ></div>
    </div>
  )
}

export default GuideSection