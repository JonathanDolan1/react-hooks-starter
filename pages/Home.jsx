
export function Home() {
    return (
        <section className="home-container">
            <h1 className="home-header">Welcome to Appsus</h1>
            <h1 className="home-header">Your All-in-One Mail and Notes App</h1>

            <p className="home-text">Appsus seamlessly integrating powerful tools for managing emails and notes in one intuitive platform.</p>

            <div className='home-img-container-mac'>
                <img className='mac-demo' src="assets/imgs/Macbook-demo.png" alt="mac demo" />
                <div className='home-img-container-phone'>
                    <img className='iphone-demo' src="assets/imgs/iphone-demo_1.png" alt="iphone demo" />
                </div>
            </div>

        </section>
    )

}
