import React from 'react'
import { useState } from 'react'

const Teasor = () => {
  const [showMore, setShowMore] = useState(false)
  return (
    <div className="bg-[#1c1c1c]">
      <div id="uber" className="container bg-[#1c1c1c]">
        <div className="mt-0 bg-[#1c1c1c] text-center text-2xl font-bold uppercase text-[#da0812] xl:text-6xl">
          Kurz über uns
        </div>
        <div className="mb-5 flex flex-col items-center bg-[#1c1c1c] lg:flex-row">
          <img
            className="w-1/1 justify-center p-5 lg:h-[600px] lg:w-1/2"
            src="https://res.cloudinary.com/ingootag-com/image/upload/v1650355778/samples/food/ilovepdf_pages-to-jpg/istockphoto-514775934-612x612_fzixg3.jpg"
          />
          <p className="w-1/1 px-5 text-center text-[18px] tracking-wider text-[white] sm:p-10 sm:text-[18px] lg:w-1/2 lg:text-[18px]">
            Unser Restaurant im Herzen des Ruhrgebietes ist nach der Provinz
            Bamyan benannt. Diese Provinz liegt wieder im Mittelpunkt des
            vorderasiatischen Staates Afghanistan, und zwar in den Regionen
            Hazarajat und Hazaristan. Das Highlight unseres Hauses ist und
            bleibt die afghanische Küche, die in der Hauptsache von der
            persischen und indischen Küche beeinflusst wird
            {showMore ? (
              <span>
                Eine unserer beliebten Spezialitäten in afghanischem Flair ist
                das Grillen von Rind, Lamm und Huhn, als Hauptbegriff
                &quot;Kabab&quot; genannt... Dabei wird das Fleisch auf Spießen
                über Holzkohle zubereitet, und in Verbindung mit Duftreis dem
                Gast serviert. In der afghanischen Küche spielen natürlich
                Gewürze eine sehr große Rolle. Ein sehr bekanntes und bei den
                Gästen beliebtes Gewürz ist &quot;Garom Masala&quot;. Dieses
                Gewürz besteht aus einem Mix von Zimt, Chili, Nelken, Paprika
                und Safran. Diese Gewürze kennt man ja auch in unseren
                Breitengraden. Aber in der afghanischen Küche wird auch viel von
                der persischen und arabischen Küche übernommen. Koriander,
                Kreuzkümmel, Minze, Dill sowie Kardamon gehören zum
                abwechslungsreichen Speiseplan. <br />
                Was in der afghanischen Küche auch sehr viel verwendet wird, ist
                die griechische Gewürzpflanze Koriander, im Afghanischen auch
                als &quot;Gashneez&quot; bekannt.
              </span>
            ) : (
              <> ... </>
            )}
            <button
              //  onClick={toggleShowMore}
              onClick={() => setShowMore(!showMore)}
              className="text-md mx-auto mt-5 block rounded-lg bg-[#c62c2c] p-4 text-white xl:text-3xl"
            >
              {showMore === true ? 'weniger erfahren' : 'mehr erfahren'}
            </button>
          </p>
        </div>
        <div className="mb-0 flex flex-col items-center lg:flex-row">
          <p className="w-1/1 px-10 text-center text-[18px] tracking-wider text-[white] sm:p-10 sm:text-[18px] lg:w-1/2 lg:text-[18px]">
            Sie wird im afghanischen Volksmund auch gern &quot;afghanische
            Petersilie&quot; genannt. Wie in jeder anderen Küche der Welt, sind
            Zwiebeln und Knoblauch auch in der afghanischen Küche unverzichtbar.
            Aber, Gewürze hin oder her: Das wichtigste Nahrungsmittel der
            Afghanen ist und bleibt das Weizenbrot, genannt &quot;Non&quot; oder
            auch &quot;Chapati&quot;. Es gilt, mit Tee serviert, als
            vollwertiges Essen. Das Weizenbrot wird auch gerne zu anderen
            Gelegenheiten als Beilage benutzt, vor allem bei scharf gewürzten
            Suppen.
          </p>
          <img
            className="w-fill h-fill justify-center p-5 lg:h-[800px] lg:w-[700px]"
            src="https://res.cloudinary.com/ingootag-com/image/upload/v1652004733/samples/food/single%20menu%20items/25-Kabul_paltte_ccqrvy.png"
            alt="loading..."
          />
        </div>
        <div className=" mb-0 flex  flex-col items-center lg:flex-row">
          <div className="w-full p-5 ">
            <img
              className="max-h-[600px] w-full object-cover"
              src="/images/salon.jpg"
              alt="loading..."
            />
          </div>
          <p className="w-1/1 px-5 text-center text-[18px] tracking-wider text-[white] sm:p-10 sm:text-[18px] lg:w-1/2 lg:text-[18px]">
            Einen sehr hohen und bedeutenden Stellenwert in der asiatischen
            Welt, wozu ja auch Afghanistan gehört, besitzt auch das wichtige
            Nahrungsmittel Reis. Aus dem langkörnigen Reis werden gerne
            &quot;Pilaws&quot; hergestellt, was soviel wie orientalischer
            Reiseintopf bedeutet. Den Beilagenreis nennt man &quot;chalau&quot;,
            und den kurzkörnigen, klebrigen Reis bezeichnet man in Afghanistan
            als &quot;bata&quot;.
            {showMore ? (
              <span>
                Weiterhin werden unterschiedliche Reisdesserts angerichtet, die
                man &quot;Shola&quot; nennt. Auch Nudelgerichte erfreuen sich
                großer Beliebtheit und werden in verschiedenen Varianten
                zubereitet. Als kleine Mahlzeit zwischendurch wird auch sehr
                gerne gefülltes Gebäck jeglicher Art gegessen. In Afghanistan
                ist es sogar üblich, dass gefüllte Gebäckstücke von
                Straßenverkäufern preiswert angeboten werden und auch regen
                Absatz finden.
              </span>
            ) : (
              <>...</>
            )}
          </p>
          <button
            //  onClick={toggleShowMore}
            onClick={() => setShowMore(!showMore)}
            className="text-md mb-5 mt-3 block rounded-lg bg-[#c62c2c] p-4 text-white xl:text-3xl"
          >
            {showMore === true ? 'weniger erfahren' : 'mehr erfahren'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Teasor
