
import Card from "@/components/Card" 
import SignInButton from "@/components/SignInButton"
import "bootstrap/dist/css/bootstrap.min.css" 
import "../css/app.css"
const background_image = new URL ("../imagenes/background.jpg", import.meta.url)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <div className="card">
              <h4><b>GREEN CIRCLE</b></h4>
               <p>Inicia sesión para continuar</p>  
            <div className="container">
                <SignInButton/>
           </div>
      
          </div>
        </div>

    </main>
  )
}
