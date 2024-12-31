import SectionTitle from '../ui/SectionTitle'

const EcoFriendlyTravelTips = () => {
  const tips = [
    {
      title: 'Reduce Plastic Waste',
      description:
        'Carry reusable water bottles, utensils, and bags to minimize waste during your travels.',
      image: 'https://theleefo.com/assets/images/impact.png'
    },
    {
      title: 'Use Eco-Friendly Transport',
      description:
        'Opt for trains, buses, or bike rentals instead of taxis or private cars.',
      image:
        'https://cdn-icons-png.freepik.com/256/733/733763.png?semt=ais_hybrid'
    },
    {
      title: 'Support Local Economies',
      description:
        'Support local businesses by buying locally-made products and eating at local restaurants.',
      image: 'https://cdn-icons-png.flaticon.com/256/4660/4660959.png'
    }
  ]


  return (
    <section id='eco' className=' py-10'>
      <div className='container mx-auto text-center'>
        <SectionTitle
          subtitle={
            ' Discover simple ways to make your adventures more sustainable.'
          }
          title={'Eco-Friendly Travel Tip'}
        ></SectionTitle>
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {tips.map((tip, index) => (
            <div key={index} className='p-6 bg-white  shadow-md'>
              <img
                src={tip.image}
                alt={tip.title}
                className='h-16 mx-auto mb-4'
              />
              <h3 className='text-xl font-semibold'>{tip.title}</h3>
              <p className='text-gray-500'>{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcoFriendlyTravelTips
