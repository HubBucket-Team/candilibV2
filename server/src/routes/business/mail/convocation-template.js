export const getConvocationTemplate = (
  nameCandidat,
  nameCentre,
  dateResa,
  houreResa,
  codeNeph,
  addressCentre,
  urlRESA,
  urlFAQ
) => `<p>Le présent mail vaut convocation.</p>
<p>Madame, Monsieur ${nameCandidat},</p>
<br>
<p>Nous avons bien pris en compte votre réservation à l'examen pratique du permis de conduire à ${nameCentre} le ${dateResa} à ${houreResa} avec le numéro NEPH ${codeNeph}.</p>
<p>${addressCentre} </p>
<br>
<p>Nous vous rappelons les éléments à vérifier le jour de l'examen :</p>
<div>
  <ul>
    <li>Vous fournirez un véhicule en parfait état, équipé d’une double commande de frein et d’embrayage, de 2 rétroviseurs intérieurs et de 2 rétroviseurs latéraux.
    </li>
    <li>
      <p>Votre accompagnateur sera :<p>
        <ul>
          <li>
            soit un enseignant de la conduite en possession de l'original de son autorisation d'enseigner pour la présenter à l'inspecteur,
          </li>
          <li>
            soit une personne dont le permis B est en cours de validité. Cette dernière devra présenter son permis ainsi que la « <a href='https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000036251681'>charte de l’accompagnateur</a> » remplie et signée
            pour la remettre à l’inspecteur avant le début de l’examen.
          </li>
          <li>
            <p>
              Vous présenterez un titre d’identité en cours de validité : carte nationale d’identité, passeport ou titre de séjour (liste complète {' '}
              <a href="https://legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000033736411&categorieLien=id">
                arrêté du 23 décembre 2016 relatif à la justification de l&apos;identité, du domicile, de la résidence normale et de la régularité du séjour pour l&apos;obtention du permis de conduire
              </a>).
            <p>
          </li>
          <li>
            <p>Votre permis de conduire original si vous avez obtenu une autre catégorie depuis moins de 5 ans afin de bénéficier d’une dispense d’examen théorique général.</p>
          </li>
          <li>
            L'attestation d'assurance du véhicule, en cours de validité, comportant obligatoirement les mentions suivantes :
            <uL>
              <li>la raison sociale de la société d'assurance ;</li>
              <li>les nom et prénom du candidat bénéficiant de la police d'assurance ;</li>
              <li>le numéro d'immatriculation du véhicule couvert ;</li>
              <li>le type d'assurance (couverture de l'ensemble des dommages
              pouvant être causés aux tiers à l'occasion de l'examen)</li>
            </ul>
          </li>
        </ul>
    </li>
    <li>
      Une enveloppe affranchie à 20 g.
    </li>
    <li>
      Lorsque vous avez fait l'objet d'une annulation du permis, le récépissé de la « fiche retour au permis de conduire » que vous aurez imprimé
      sur le site de l’ <a href='https://permisdeconduire.ants.gouv.fr/'>ANTS</a>.
    </li>
  </ul>
</div>
<p><b>Attention :</b></p>
<p>
  Le mauvais état du véhicule (pneus lisses, rétros cassés ou absents, non fonctionnement de tous les feux, etc.), ou l'absence ou la non-validité d'un des documents exigés ci-dessus,
  pour le candidat ou pour l'accompagnateur, entraîne le report de l'examen À une date ultérieure.
  <br/>
</p>
<p>
  Si besoin, vous pouvez annuler <a href=${urlRESA}>votre réservation</a>.
  Si vous annulez 7 jours avant la date prévue, vous pourrez choisir un autre créneau disponible.
  Nous vous souhaitons une bonne préparation et le succès à l'examen.
  Pour toute information, vous pouvez consulter <a href=${urlFAQ}>notre aide en ligne</a>.
</p>
<br/>
<p align="right">L'équipe Candilib</p>`