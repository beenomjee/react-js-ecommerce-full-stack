import styles from './Brand.module.scss';

const Card = ({ card }) => {
    return (
        <div className={styles.card}>
            <img src={card.icon} alt={card.heading} />
            <h6>{card.heading}</h6>
            <p>{card.detail}</p>
        </div>
    )
}

const cards = [
    {
        icon: '/icons/Delivery.svg',
        heading: 'Next day as standard',
        detail: 'Order before 3pm and get your order the next day as standard'
    },
    {
        icon: '/icons/Checkmark--outline.svg',
        heading: 'Made by true artisans',
        detail: 'Handmade crafted goods made with real passion and craftmanship'
    },
    {
        icon: '/icons/Purchase.svg',
        heading: 'Unbeatable prices',
        detail: 'For our materials and quality you won’t find better prices anywhere'
    }, {
        icon: '/icons/Sprout.svg',
        heading: 'Recycled packaging',
        detail: 'We use 100% recycled packaging to ensure our footprint is manageable'
    },
]

const Brand = () => {
    return (
        <div className={styles.container}>
            <h2>What makes our brand different</h2>
            <div className={styles.cards}>
                {
                    cards.map((card, index) => (
                        <Card key={index + card.detail} card={card} />
                    ))
                }
            </div>
        </div>
    )
}

export default Brand