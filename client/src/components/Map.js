import React from 'react';

const Map = ()=>{
    return(
        <>
            <section className="about"  >
                <div className="container">
                <h3>About Morocco</h3>
                <div className="abount-content row">
                    <div className="description col-sm-6" style={{ background:`url("/images/ma-01.png")`  }}>
                        <p>Morocco, officially the Kingdom of Morocco, is the northwesternmost country in the Maghreb region of North Africa. It overlooks the Mediterranean Sea to the north and the Atlantic Ocean to the west, and has land borders with Algeria to the east, and the disputed territory of Western Sahara to the south. Morocco also claims the Spanish exclaves of Ceuta, Melilla and Peñón de Vélez de la Gomera, and several small Spanish-controlled islands off its coast. It spans an area of 446,550 km2 (172,410 sq mi) or 710,850 km2 (274,460 sq mi), with a population of roughly 37 million. Its official and predominant religion is Islam, and the official languages are Arabic and Berber; the Moroccan dialect of Arabic and French are also widely spoken. Moroccan identity and culture is a vibrant mix of Berber, Arab, and European cultures. Its capital is Rabat, while its largest city is Casablanca.</p>        
                    </div>
                    <div className="map col-sm-6">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13235101.686657706!2d-14.067040277208973!3d30.518392794903168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b88619651c58d%3A0xd9d39381c42cffc3!2sMaroc!5e1!3m2!1sfr!2sma!4v1630582688390!5m2!1sfr!2sma" height={400} style={{border:0,width:100+'%',borderRadius:0.5+'rem',boxShadow:'0 0 10 rgba(0,0,0,.25)'}} allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>       
                </div>
            </section>
        </>
    )
}

export default Map;