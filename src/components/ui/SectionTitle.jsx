import Icon from "./Icon"

function SectionTitle ({ title, subtitle, className }) {
  return (
    <div className={`text-center my-12 md:my-24 ${className}`}>
      {subtitle && <h3 className='text-lg text-gray-500'>{subtitle}</h3>}
      <h2 className='text-xl flex items-center justify-center md:text-3xl p-4 lg:text-6xl font-semibold text-[#203a67]'>
        <Icon rotate='-90deg' fill={'#111'}></Icon>
        {title}
        <Icon rotate='90deg' fill={'#111'}></Icon>
      </h2>
    </div>
  )
}

export default SectionTitle
