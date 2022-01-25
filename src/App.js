import { useEffect, useReducer } from 'react';
import useState from 'react-usestateref';
import './App.css';

function Kortti({kortit}) {
  const [kääntö,setKääntö] = useState(false)
  const [currentKortti,setCurrentKortti,currentRef] = useState(Number)
  
  const [vastattu, setVastattu] = useState(false);
  const onVastattu = {
    backgroundColor: vastattu ? 'green' : '',
  }

  useEffect(() => {
    //seuraava()
    console.log(currentRef.current)
  },[])

  const flip = () => {
    setKääntö(!kääntö)
  }
  const seuraava = () => {
    if (currentRef.current < (kortit.length-1)) {
      setCurrentKortti(currentKortti + 1)
    } else {
      setCurrentKortti(0)
    }
  }
  const tarkistaVastaus = (event) => {
    event.preventDefault()
    if (event.target.value === kortit[currentRef.current].vastaus) {
      console.log('oikein!')
      seuraava()
    } else {
      console.log('väärin!')
    }
  }
  function neljäRandomia() {
    const uniqAr = []
    const vAr = []
    while (uniqAr.length < 4) {
      uniqAr[0] = currentRef.current
      const rand = Math.floor(Math.random()*kortit.length)
      if(uniqAr.indexOf(rand) === -1) {
        uniqAr.push(rand)
      }
    }
    //console.log('uniqar',uniqAr)
    uniqAr.forEach(num => {
      vAr.push(kortit[num])
    })
    //console.log('vAr lopputulos',vAr)
    return vAr
  }
  const  NeljäNappulaa = () => {
    const neljäAr = neljäRandomia()
    for (let i=0;i<neljäAr.length;i++) {
      if (neljäAr[i] === kortit[currentRef.current]) {
        //https://stackoverflow.com/a/43235780
        neljäAr.sort(() => Math.random() - 0.5);
      } else {
        //neljäNappulaa()
      }
    }
    return (
      <div>
        {neljäAr.map(vastaus => (
          <button
            style={onVastattu} 
            key={vastaus.vastaus} 
            onClick={(e)=>tarkistaVastaus(e)} 
            value={vastaus.vastaus}>{vastaus.vastaus}</button>
        ))}
      </div>
    )
    
  }
  return(
    <div>
      <div id="kortti">
        {kääntö === false &&
            <div>
              <img src={kortit[currentRef.current].kysymys}></img>
            </div>
          }
        {kääntö === true &&
            <div>{kortit[currentKortti].vastaus}</div>
          }
      </div>
      <div id="nappulat">
        {/*kortit.map((kortti) => (
          <div key={kortti.vastaus}>
          <button onClick={(e)=>tarkistaVastaus(e)} value={kortti.vastaus}>{kortti.vastaus}</button>
          </div>
        ))*/}
        <NeljäNappulaa />
      </div>
      <div id="seuraava">
        <button onClick={seuraava}>Seuraava</button>
      </div>
    </div>
  )
}

function App() {
  const [sekoitettu, setSekoitettu] = useState(false)
  const [kortit, setKortit] = useState([
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/4/48/Gay_Pride_Flag.svg", "vastaus":"gay"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Agender_pride_flag.svg", "vastaus":"agender"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/a/ad/Aromantic_Pride_Flag.svg", "vastaus":"aromantic"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/9/9e/Asexual_Pride_Flag.svg", "vastaus":"asexual"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/c/c2/Bear_Brotherhood_flag.svg", "vastaus":"bear"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/9/92/Bigender_Flag.svg", "vastaus":"bigender"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/2/2a/Bisexual_Pride_Flag.svg", "vastaus":"bisexual"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/a/a7/Demisexual_Pride_Flag.svg", "vastaus":"demisexual"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/0/0a/Gay_Men_Pride_Flag.svg", "vastaus":"gay men"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/b/b8/Genderfluidity_Pride-Flag.svg", "vastaus":"genderfluid"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/1/1f/Genderqueer_Pride_Flag.svg", "vastaus":"genderqueer"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/3/38/Intersex_Pride_Flag.svg", "vastaus":"intersex"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/7/7e/Leather%2C_Latex%2C_and_BDSM_pride_-_Light.svg", "vastaus":"Leather/latex/bdsm"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/d/dd/Labrys_Lesbian_Flag.svg", "vastaus":"labrys lesbian"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/0/06/Lipstick_lesbian_Pride_Flag.svg", "vastaus":"lipstick lesbian"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/8/84/Lesbian_Pride_pink_flag.svg", "vastaus":"lesbian pride pink"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/f/f8/Lesbian_pride_flag_2018.svg", "vastaus":"lesbian pride 2018"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/3/35/Lesbian_Pride_Flag_2019.svg", "vastaus":"lesbian pride 2019"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/7/75/Nonbinary_flag.svg", "vastaus":"nonbinary"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/a/a2/Pansexuality_Pride_Flag.svg", "vastaus":"pansexual"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/b/b6/Polyamory_Pride_Flag.svg", "vastaus":"polyamory"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/a/ae/Polysexuality_Pride_Flag.svg", "vastaus":"polysexuality"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/f/fd/LGBTQ%2B_rainbow_flag_Quasar_%22Progress%22_variant.svg", "vastaus":"rainbow flag progress variant"},
    {"kysymys":"https://upload.wikimedia.org/wikipedia/commons/b/b0/Transgender_Pride_flag.svg", "vastaus":"transgender"},
  ])
  useEffect(() => {
    if (sekoitettu === false) {
      //https://stackoverflow.com/a/43235780
      setKortit(kortit.sort(() => Math.random() - 0.5))
      //paska sortti antaa liian useasti 1 ekana
      setSekoitettu(!sekoitettu)
    } else {
      //console.log('sekoitettu?',sekoitettu)
    }
  },[])

  return (
    <div id="html">
      <div id="body">
        <Kortti kortit={kortit}/>
      </div>
      <div>
        <footer>
          <a href="https://en.wikipedia.org/wiki/Pride_flag">Liput wikipedia/wiki/pride_flag</a>
        </footer>
      </div>

    </div>
  );
}

export default App;
