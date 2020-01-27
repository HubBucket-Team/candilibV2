
export default {
  app_name: 'Candilib',
  app_html_title: 'C<span class="col-red">a</span>ndilib',
  app_subtitle: 'Réservez votre place d\'examen',
  confirmation_choix_departement: 'Je confirme choisir le département {departement} pour passer mon examen',
  confirmation_reservation_title: 'Confirmation',
  confirmation_reservation_subtitle: 'Vous avez choisi de passer l’épreuve pratique du permis à',
  confirmation_reservation_word: 'Le',
  confirmation_reservation_checkbox_title: 'Confirmez, en cochant obligatoirement les deux cases suivantes, <br> que vous avez vérifié',
  confirmation_reservation_checkbox_accompagner: 'qu’une personne peut vous accompagner',
  confirmation_reservation_checkbox_double_commande: 'qu’une voiture à double commande est disponible',
  confirmation_reservation_bouton_retour: 'Retour',
  confirmation_reservation_bouton_confirmation: 'Confirmer',
  confirmation_reservation_bouton_modification_confirmation: 'Confirmer',
  evaluate_now: 'Noter maintenant',
  home_choix_date_creneau_message_echec_date_pratique: `Vous avez échoué le {dateDernierEchecPratique} à l'examen pratique du permis de conduire. Vous ne pouvez sélectionner une date qu'à partir du {canBookFromAfterFailure}.`,
  later: 'Plus tard',
  leave_a_comment: 'Laissez-nous un commentaire',
  preinscription_title: 'Candilib',
  preinscription_form_notice: 'Tous les champs marqués d\'un astérisque * sont obligatoires',
  preinscription_neph: 'NEPH',
  preinscription_neph_erreur: 'Le code neph n\'est pas valide',
  preinscription_nom_naissance: 'Nom de naissance',
  preinscription_prenom: 'Prénom',
  preinscription_email: 'Courriel',
  preinscription_email_erreur: 'L\'adresse courriel doit être valide',
  preinscription_email_vide: 'Veuillez renseigner votre adresse courriel',
  preinscription_mobile: 'Portable',
  preinscription_mobile_erreur: 'Le numéro de téléphone doit être valide',
  preinscription_adresse: 'Adresse',
  preinscription_bouton_submit: 'Pré-inscription',
  preinscription_bouton_deja_inscrit: 'Déjà Inscrit ?',
  preinscription_bouton_mentions_legales: 'Mentions légales',
  preinscription_bouton_faq: 'Une question ?',
  preinscription_magic_link_title: 'Recevez un lien de connexion',
  preinscription_magic_link_msg: 'Envoyez un Lien de connexion',
  preinscription_bouton_magic_link: 'Envoyez un Lien de connexion',
  preinscription_formulaire_invalide: 'Veuillez remplir le formulaire',
  preinscription_magic_link_invalide: 'Veuillez fournir votre adresse courriel',
  preinscription_magic_link_envoyé: 'Un lien de connexion vous a été envoyé. Veuillez consulter votre boîte courriel',
  home_choix_du_centre: 'Choix du centre',
  home_choix_date_creneau_message_de_penalite: `Vous avez annulé ou modifié votre réservation à moins de {numberOfDaysBeforeDate} jours de la date d'examen.
  Vous ne pouvez sélectionner une date qu'à partir du {canBookFromAfterCancel}`,
  recap_reservation_confirmee: 'Votre réservation est confirmée',
  recap_reservation_email_confirmee: 'Un email de confirmation vous a été envoyé à l\'adresse renseignée à l\'inscription',
  recap_reservation_last_date_to_cancel: 'Si vous annulez après le {lastDateToCancelString} vous serez pénalisé·e de {penaltyDaysNumber} jours',
  recap_reservation_boutton_annuler: 'Annuler ma réservation',
  recap_reservation_modal_annuler_body_with_penalty:
    `<p>
      En poursuivant, votre réservation du {dateCurrentResa} sera annulée.
    </p>
    <p>
      De plus, étant à moins de {nbOfDaysBeforeDate} jours de la date d'examen,
      <b>un délai de repassage de {penaltyNb} jours</b>
      s'appliquera à partir de la date de votre réservation annulée.
    </p>
    <p class="red--text">
      Souhaitez-vous confirmer ?
    </p>`,
  recap_reservation_modal_annuler_body_without_penalty:
    `<p>
      En poursuivant, votre réservation du {dateCurrentResa} sera annulée.
      </p>
    <p class="red--text">
      Souhaitez-vous confirmer ?
    </p>`,
  recap_reservation_modal_annuler_boutton_retour: 'Retour',
  recap_reservation_modal_annuler_boutton_confirmer: 'Confirmer',
  recap_reservation_modal_modification_boutton_continuer: 'Continuer',
  recap_reservation_modal_modification_body_info_penalty:
    `<p>
      Vous allez changer de date pour votre examen à l'épreuve pratique.
    </p>
    <p>
      Conformément aux règles de gestion de candilib vous ne pourrez pas choisir une nouvelle date avant un délai de
      <strong>
        {penaltyNb} jours
      </strong>
      après le
      <strong>
        {dateCurrentResa}
      </strong>.
      <p>
        Vous pourrez donc sélectionner une date qu'à partir du
        <strong>
          {canBookFrom}
        </strong>.
      </p>
    </p>
    <p>
      Souhaitez-vous néanmoins poursuivre votre modification ?
    </p>`,
  recap_reservation_boutton_modifier: 'Modifier ma réservation',
  recap_reservation_boutton_renvoyer_email: 'Renvoyer ma convocation',
  stepper_step_1_title: 'Pré-inscription',
  stepper_step_1_subtitle: 'Vous remplirez un formulaire en ligne',
  stepper_step_1_p: 'Vous devrez fournir votre nom et prénom, votre NEPH, et une adresse courriel valide, entre autres informations.',
  stepper_step_2_title: 'Validation de votre adresse courriel',
  stepper_step_2_subtitle: 'Vous validerez votre adresse courriel en cliquant sur le lien présent dans le courriel',
  stepper_step_2_p: 'Ce courriel arrivera à l\'adresse indiquée dans le formulaire de pré-inscription.',
  stepper_step_3_title: 'Validation de votre inscription',
  stepper_step_3_subtitle: 'Nous ferons les vérifications nécessaires',
  stepper_step_3_p1: 'Nous vérifierons votre nom et votre NEPH ainsi que les prérequis pour passer l\'épreuve pratique.',
  stepper_step_3_p2: 'Vous recevrez un courriel vous indiquant si votre inscription est validée ou non.',
  stepper_queue_step_title: 'Mise en file d\'attente',
  stepper_queue_step_subtitle: 'Attente de {lineDelay} jours avant d\'accéder au planning de réservation',
  stepper_queue_step_p: 'Cette mise en file d\'attente vous permet de planifier votre préparation en vue de réussir votre examen du permis de conduire.',
  stepper_step_5_title: 'Réservation de votre place d\'examen',
  stepper_step_5_subtitle: 'Connexion à l\'application par le magic link envoyé par mail pour réserver votre place',
  stepper_step_5_p: 'Si votre inscription est validée, vous pouvez réserver votre place d\'examen sur l\'application.',
  expired_token_message: `Votre connexion n'est plus valide, veuillez réutiliser le bouton "Déjà inscrit"`,
  deconexion_message: `Vous êtes déconnecté·e`,
  unauthorize_action: `Action non autorisée`,
}
