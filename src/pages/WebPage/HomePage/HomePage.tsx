import { Carousel } from "@/components";
import { Contact } from "@/pages";
import { Link } from "react-router-dom";
import "./HomePage.scss";

export const HomePage = () => {
  return (
    <>
      <Carousel />
      <div className="offer">
        <section>
          <h1>Reussgraphy</h1>
          <h2>momenty uchwycone na zawsze📸</h2>

          <p>
            Uwiecznimy Twoje wspomnienia obiektywami kamery i aparatu. Nasza
            kompleksowa oferta obejmuje wysokiej jakości zdjęcia i nagrania
            wideo realizowane przy użyciu najlepszego sprzętu, aby zagwarantować
            Ci dzieło w najwyższej jakości.
          </p>

          <figure>
            <figcaption>Nasze Usługi:</figcaption>
            <ul>
              <li>
                Wydarzenia Taneczne: Profesjonalnie rejestrujemy ruch i dynamikę
                tancerzy, by uchwycić ich talent w niezwykły sposób.
              </li>
              <li>
                Sesje w Studio: W naszym studio fotograficznym oferujemy zdjęcia
                portretowe i sesje tematyczne, które w doskonałych warunkach
                wydobędą Twoją unikalną osobowość.
              </li>
              <li>
                Imprezy Okolicznościowe: Uwieczniamy najważniejsze chwile
                Twojego życia: urodziny, śluby, wesela, chrzciny, komunie i inne
                wydarzenia. Tworzymy wyjątkowe pamiątki z dbałością o każdy
                szczegół.
              </li>
              <li>
                Sesje Plenerowe: Odkryj z nami naturalne piękno w malowniczych
                plenerach, które staną się tłem dla Twoich wspomnień.{" "}
              </li>
            </ul>
          </figure>

          <figure>
            <figcaption>Więcej o nas:</figcaption>
            <ul>
              <li>
                Dojazd do Klienta: Dostosowujemy się do Twoich potrzeb, oferując
                profesjonalne usługi gdziekolwiek zechcesz.{" "}
              </li>
              <li>
                Nasz Sprzęt: Wykorzystujemy najnowocześniejszy i najwyższej
                jakości sprzęt, by zapewnić krystalicznie czysty obra i
                perfekcyjne detale.
              </li>
              <li>
                Portfolio: Zapraszamy do zapoznania się z naszymi{" "}
                <Link to="/gallery">dotychczasowymi realizacjami</Link>.
                Szczegółowe portfolio dotępne na życzenie klienta wraz z
                indywidualną wyceną.
              </li>
            </ul>
          </figure>
          <figure>
            <figcaption>Skontaktuj się z nami:</figcaption>
            Jesteś zainteresowany naszymi usługami w Krakowie lub okolicy?
            Skorzystaj z formularza kontaktowego na naszej stronie lub zadzwoń
            pod numer <b>+48 555 555 555</b>. Możesz również napisać do nas na{" "}
            <b>reussgraphy@gmail.com</b>.
            <p>
              Doceniamy Twoje zainteresowanie i nie możemy się doczekać, aż
              uchwycimy Twoje momenty na zawsze.
            </p>
          </figure>
        </section>
      </div>
      <Contact />
    </>
  );
};
