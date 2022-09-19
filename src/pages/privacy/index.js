import { Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import AuthFooter from '../../components/auth-footer';
import Page from '../../components/Page';
import useStyles from './styles';

const appIcon = '/assets/svg/wallet_logo.svg'

export default function Privacy(){
    const styles = useStyles()
    const [language, setLanguage] = useState('en')

    function renderContent(){
        if(language === 'ge'){
            return (
                <div className={styles.ctnDesc}>
                    <Typography variant='h4' fontWeight={"800"} marginBottom={2}>Datenschutz</Typography>
                    <p>Informationspflicht bei Erhebung von personenbezogenen Daten bei der betroffenen Person</p>
                    <br />
                    <p>1. Verantwortlicher und Kontaktdaten</p>
                    <p>Der Verantwortliche f&uuml;r die Verarbeitung ist die Firma Admiral Studio GmbH (nachfolgend Verantwortlicher) und verarbeitet die von dem Betroffenen (nachfolgend Kunde) mitgeteilten Daten gem&auml;&szlig; den Bestimmungen der Europ&auml;ischen Datenschutz-Grundverordnung (nachfolgend DSGVO).</p>
                    <p>Die Kontaktdaten des Verantwortlichen lauten:</p>
                    <p>Anschrift: Urbanstr. 71, 10967 Berlin, Germany&nbsp;<br />Telefon: +49 177 314 0680<br />E-Mail: walletads@admiral.studio</p>
                    <br />
                    <p>2. Datenschutzbeauftragter</p>
                    <p>Den Datenschutzbeauftragte der Admiral Studio GmbH erreicht ihr via E-Mail: walletads@admiral.studio</p>
                    <br />
                    <p>3. Zweck und Rechtsgrundlage</p>
                    <p>Die Verarbeitung der personenbezogenen Daten des Kunden ist f&uuml;r die Erf&uuml;llung eines Vertrags, dessen Vertragspartei der Kunde ist, oder zur Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen erforderlich, die auf Anfrage des Kunden erfolgen. Rechtsgrundlage f&uuml;r diese Verarbeitung ist Art. 6 Abs. 1 b) DSGVO.</p>
                    <p>F&uuml;r den Fall, dass der Kunde das Kontaktformular auf der Webseite des Verantwortlichen nutzt oder in anderer Weise Kontakt zum Verantwortlichen aufnimmt, insbesondere per E-Mail, Telefon, Fax oder Post, werden die personenbezogenen Daten ausschlie&szlig;lich zur Bearbeitung seiner Anfrage verwendet. Rechtsgrundlage f&uuml;r diese Verarbeitungen ist die Einwilligung des Kunden nach Art. 6 Abs. 1 a) DSGVO.</p>
                    <p>F&uuml;r den Fall, dass der Kunde das Kontaktformular auf der Social Media Plattformen nutzt, werden die personenbezogenen Daten zur Bearbeitung seiner Anfrage verwendet. Dar&uuml;ber hinaus werden die personenbezogenen Daten des Kunden zu Marketingzwecken (Direktwerbung) verwendet. Rechtsgrundlage f&uuml;r diese Verarbeitung ist die Einwilligung des Kunden nach Art. 6 Abs. 1 a) DSGVO. Der Verantwortliche weist auf das Widerspruchsrecht des Kunden hin. N&auml;here Informationen erh&auml;lt der Kunde unter Punkt 9 dieser Erkl&auml;rung.</p>
                    <p>In den sonstigen F&auml;llen, in denen personenbezogene Daten verarbeitet werden, erfolgt die Verarbeitung zur Wahrung der berechtigten Interessen des Verantwortlichen, n&auml;mlich zur Analyse der Benutzung der Webseite durch Google Analytics, zur Einbindung externer Schriftarten durch Google Fonts oder Cloudflare um Cyberattacken oder St&ouml;rungen an der Webseite zu erkennen, einzugrenzen oder zu beseitigen. Rechtsgrundlage f&uuml;r diese Verarbeitung ist Art. 6 Abs. 1 f) DSGVO. Der Verantwortliche weist auf das Widerspruchsrecht des Kunden hin. N&auml;here Informationen erh&auml;lt der Kunde unter Punkt 9 dieser Erkl&auml;rung.</p>
                    <br />
                    <p>4. Empf&auml;nger</p>
                    <p>Die personenbezogenen Daten des Kunden, die dem Verantwortlichen &uuml;bermittelt werden, werden folgenden Empf&auml;ngern wie folgt zug&auml;nglich gemacht:</p>
                    <br />
                    <p>4.1 Erf&uuml;llung des Vertrags oder Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen</p>
                    <p>Zur Erf&uuml;llung des Vertrags oder der Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen, werden die personenbezogenen Daten des Kunden, die dem Verantwortlichen &uuml;bermittelt werden, folgenden Empf&auml;ngern zug&auml;nglich gemacht:</p>
                    <p>&bull; Microsoft Corporation, One Microsoft Way, Redmond, WA 980526399, USA</p>
                    <p>&bull; Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                    <p>&bull; Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA</p>
                    <p>&bull; The Constant Company, LLC (Vultr), 319 Clematis Street Suite 900, West Palm Beach, FL 33401, USA</p>
                    <p>&bull; Contentful GmbH, Max-Urich-Stra&szlig;e 3, 13355 Berlin, Germany</p>
                    <p>&bull; Mailgun Technologies, Inc., 112 E Pecan St. #1135, San Antonio, TX 78205</p>
                    <p>Ohne die schriftliche Einwilligung des Kunden werden die personenbezogenen Daten nicht an weitere Dritte zug&auml;nglich gemacht, es sei denn, dass dieses aufgrund gesetzlicher Anordnung erfolgen muss.</p>
                    <br />
                    <p>4.2 Nutzung der Kommentarfunktion und sonstigen Kontaktaufnahme</p>
                    <p>Im Falle der Nutzung des Kontaktformulars auf der Webseite des Verantwortlichen, werden die personenbezogenen Daten des Kunden, die dem Verantwortlichen &uuml;bermittelt werden, folgenden Empf&auml;ngern unter Umst&auml;nden zug&auml;nglich gemacht:</p>
                    <p>&bull; Microsoft Corporation, One Microsoft Way, Redmond, WA 980526399, USA</p>
                    <p>&bull; Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                    <p>&bull; Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA</p>
                    <p>&bull; The Constant Company, LLC (Vultr), 319 Clematis Street Suite 900, West Palm Beach, FL 33401, USA</p>
                    <p>&bull; Contentful GmbH, Max-Urich-Stra&szlig;e 3, 13355 Berlin, Germany</p>
                    <p>&bull; Mailgun Technologies, Inc., 112 E Pecan St. #1135, San Antonio, TX 78205</p>
                    <br />
                    <p>4.3 &nbsp; &nbsp;Webseiten-Analyse</p>
                    <p>Zur Analyse der Benutzung der Webseite werden die personenbezogenen Daten des Kunden, die dem Verantwortlichen &uuml;bermittelt werden, folgendem Empf&auml;nger zug&auml;nglich gemacht:</p>
                    <br />
                    <p>&ndash; Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                    <br />
                    <p>Diese Webseite benutzt Google Analytics, einen Webanalysedienst der Google Inc. (&ldquo;Google&rdquo;). Google Analytics verwendet sog. &bdquo;Cookies&ldquo;, Textdateien, die auf dem PC des Kunden gespeichert werden und die eine Analyse der Benutzung der Webseite durch den Kunden erm&ouml;glichen. Die durch den Cookie erzeugten Informationen &uuml;ber die Benutzung dieser Webseite (einschlie&szlig;lich der IPAdresse) werden an einen Server von Google in den USA &uuml;bertragen und dort gespeichert. Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite, wird die IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europ&auml;ischen Union oder in anderen Vertragsstaaten des Abkommens &uuml;ber den Europ&auml;ischen Wirtschaftsraum zuvor gek&uuml;rzt. Nur in Ausnahmef&auml;llen wird die volle IP-Adresse an einen Server von Google in den USA &uuml;bertragen und dort gek&uuml;rzt. Im Auftrag des Betreibers dieser Webseite wird Google diese Informationen benutzen, um die Nutzung der Webseite auszuwerten, um Reports &uuml;ber die Aktivit&auml;ten zusammenzustellen und um weitere mit der Nutzung und der Internetnutzung verbundene Dienstleistungen gegen&uuml;ber dem Webseite-Betreiber zu erbringen. Die im Rahmen von Google Analytics von dem Browser des Kunden &uuml;bermittelte IPAdresse wird nicht mit anderen Daten von Google zusammengef&uuml;hrt. Der Kunde kann die Speicherung der Cookies durch eine entsprechende Einstellung seiner Browser-Software verhindern; der Verantwortliche weist den Kunden jedoch darauf hin, dass der Kunde in diesem Fall gegebenenfalls nicht s&auml;mtliche Funktionen dieser Webseite vollumf&auml;nglich wird nutzen k&ouml;nnen. Der Kunde kann dar&uuml;ber hinaus die Erfassung der durch den Cookie erzeugten und auf seine Nutzung der Webseite bezogenen Daten (inkl. der IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem er das unter dem folgenden Link verf&uuml;gbare Browser-Plugin herunterl&auml;dt und installiert: https://tools.google.com/dlpage/gaoptout?hl=de. Der Kunde kann die Erfassung durch Google Analytics verhindern, indem er auf folgenden Link klickt. Es wird ein Opt- Out-Cookie gesetzt, das die zuk&uuml;nftige Erfassung seiner Daten beim Besuch dieser Website verhindert: Google Analytics deaktivieren N&auml;here Informationen hierzu findet der Kunde unter: https://tools.google.com/dlpage/gaoptout?hl=de bzw. unter https://www.google.com/intl/de/analytics/privacyoverview.html (allgemeine Informationen zu Google Analytics und Datenschutz). Der Verantwortliche weist den Kunden darauf hin, dass auf dieser Webseite Google Analytics um den Code &bdquo;anonymizeIp&ldquo; (&ldquo;analytics.js&rdquo;) erweitert wurde, um eine anonymisierte Erfassung von IP-Adressen (sog. IP-Masking) zu gew&auml;hrleisten.</p>
                    <br />
                    <p>Ohne die schriftliche Einwilligung des Kunden werden die personenbezogenen Daten nicht an weitere Dritte zug&auml;nglich gemacht, es sei denn, dass dieses aufgrund gesetzlicher Anordnung erfolgen muss.</p>
                    <br />
                    <p>4.4 Google Fonts</p>
                    <p>Zur Einbindung externer Schriftarten durch Google Fonts werden die personenbezogenen Daten des Kunden, die dem Verantwortlichen &uuml;bermittelt werden, folgendem Empf&auml;nger zug&auml;nglich gemacht:</p>
                    <p>&bull; Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                    <p>Diese Webseite nutzt zur Einbindung externer Schriftarten Google Fonts. Google stellt dabei die Schriftarten zur Verf&uuml;gung. Ruft der Kunde diese Webseite auf, werden die ben&ouml;tigten Schriftarten in den Browsercache des Kunden geladen, um die Texte und Schriftarten auf der Seite korrekt anzuzeigen.</p>
                    <p>Zu diesem Zweck wird die IP-Adresse des Kunden an einen Server der Google Inc. &uuml;bertragen. Weitere Informationen erh&auml;lt der Kunde unter https://developers.google.com/fonts/faq und in der Datenschutzerkl&auml;rung von Google https://policies.google.com/privacy?hl=de.</p>
                    <p>Ohne die schriftliche Einwilligung des Kunden werden die personenbezogenen Daten nicht an weitere Dritte zug&auml;nglich gemacht, es sei denn, dass dieses aufgrund gesetzlicher Anordnung erfolgen muss.</p>
                    <br />
                    <p>4.5 Cloudflare Cyber Abwehr</p>
                    <p>Zur Abwehr von Cyberangriffen, werden die personenbezogenen Daten des Kunden, die dem Verantwortlichen &uuml;bermittelt werden, folgendem Empf&auml;nger zug&auml;nglich gemacht:</p>
                    <p>&bull; Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA</p>
                    <p>Cloudflare ist ein US-amerikanisches Unternehmen, das Internetsicherheitsdienste (DDOS -Schutz) und verteilte DNS-Dienste bereitstellt, die sich zwischen dem Besucher und dem Hosting-Anbieter des Cloudflare-Benutzers befinden und als Reverse-Proxy f&uuml;r Websites fungieren. Der Dienst sch&uuml;tzt die Website vor Cyberangriffen. Zu diesem Zweck werden die IP Adresse, der Zeitpunkt, der User Agent (Browser, Betriebssystem und Sprache), Referrer sowie alle Eingaben des Kontaktformulars an Cloudflare &uuml;bertragen und dann an die Website weitergeleitet.</p>
                    <p>Cloudflare gibt an, dass sie mit Start der DSGVO diese auch erf&uuml;llen: https://blog.cloudflare.com/keeping-your-gdpr-resolutions/</p>
                    <p>Cloudflare ist ebenfalls Mitglied im EU-US Privacy Shield: https://www.privacyshield.gov</p>
                    <p>Ohne die schriftliche Einwilligung des Kunden werden die personenbezogenen Daten nicht an weitere Dritte zug&auml;nglich gemacht, es sei denn, dass dieses aufgrund gesetzlicher Anordnung erfolgen muss.</p>
                    <br />
                    <p>5. Cookies</p>
                    <p>Auf verschiedenen Seiten verwendet der Verantwortliche Cookies, um den Besuch seiner Webseiten attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu erm&ouml;glichen. Cookies sind kleine Textdateien, die auf dem Rechner des Besuchers abgelegt werden. Die meisten der vom Verantwortlichen verwendeten Cookies werden nach Ende der Browser-Sitzung wieder von der Festplatte des Besuchers gel&ouml;scht (sog. Sitzungs-Cookies). Andere Cookies verbleiben auf dem Rechner des Besuchers und erm&ouml;glichen es dem Verantwortlichen, den Rechner des Besuchers beim n&auml;chsten Besuch wieder zu erkennen (sog. dauerhafte Cookies). Selbstverst&auml;ndlich kann der Kunde die Cookies jederzeit ablehnen, sofern der benutzte Browser dies zul&auml;sst.</p>
                    <br />
                    <p>6. Drittstaatentransfer</p>
                    <p>&ndash; Im Rahmen der Nutzung von Google Analytics und Google Fonts findet eine &Uuml;bermittlung der personenbezogenen Daten an Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, statt.</p>
                    <p>Ein Angemessenheitsbeschluss der Europ&auml;ischen Kommission fehlt. Google LLC ist aber Mitglied im EU-US Privacy Shield. Weitere Informationen zum EU-US Privacy Shield finden Sie unter der URL:</p>
                    <p>https://www.privacyshield.gov</p>
                    <br />
                    <p>&ndash; Im Rahmen der Nutzung von Vultr (The Constant Company, LLC) findet eine &Uuml;bermittlung der personenbezogenen Daten an The Constant Company, LLC, 319 Clematis Street Suite 900, West Palm Beach, FL 33401, USA, statt.</p>
                    <p>Ein Angemessenheitsbeschluss der Europ&auml;ischen Kommission fehlt. The Constant Company, LLC ist GDPR ready.</p>
                    <br />
                    <p>&ndash; Im Rahmen der Nutzung von Mailgun findet eine &Uuml;bermittlung der personenbezogenen Daten an Mailgun Technologies, Inc., 112 E Pecan St. #1135, San Antonio, TX 78205, USA, statt.</p>
                    <p>Ein Angemessenheitsbeschluss der Europ&auml;ischen Kommission fehlt. Mailgun Technologies, Inc. ist aber Mitglied im EU-US Privacy Shield. Weitere Informationen zum EU-US Privacy Shield finden Sie unter der URL:</p>
                    <p>https://www.privacyshield.gov</p>
                    <br />
                    <p>Im Rahmen der Nutzung von Microsoft findet eine &Uuml;bermittlung der personenbezogenen Daten an Microsoft Corporation, One Microsoft Way, Redmond, WA 98052-6399, USA, statt.</p>
                    <p>Ein Angemessenheitsbeschluss der Europ&auml;ischen Kommission fehlt. Microsoft ist GDPR ready und Mitglied im EU-US Privacy Shield. Weitere Informationen zum EU-US Privacy Shield finden Sie unter der URL:</p>
                    <p>https://www.privacyshield.gov</p>
                    <br />
                    <p>&ndash; Im Rahmen der Nutzung von Cloudflare findet eine &Uuml;bermittlung der personenbezogenen Daten an Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA, statt.</p>
                    <p>Ein Angemessenheitsbeschluss der Europ&auml;ischen Kommission fehlt. Cloudflare ist GDPR ready und Mitglied im EU-US Privacy Shield. Weitere Informationen finden Sie hier:</p>
                    <p>https://www.privacyshield.gov</p>
                    <br />
                    <p>7. Speicherdauer</p>
                    <p>Mit der vollst&auml;ndigen Abwicklung des Vertrags, werden die Daten des Kunden, die aus rechtlichen Gr&uuml;nden aufbewahrt werden m&uuml;ssen, gesperrt. Diese Daten stehen einer weiteren Verwendung nicht mehr zur Verf&uuml;gung. Nach Wegfall dieses rechtlichen Grundes werden diese gesperrten Daten gel&ouml;scht.</p>
                    <p>F&uuml;r den Fall, dass der Kunde Kontakt zum Verantwortlichen aufnimmt oder das Kontaktformular nutzt, werden die personenbezogenen Daten f&uuml;r die Dauer der Bearbeitung der Anfrage genutzt. Anschlie&szlig;end werden die Daten, die aus rechtlichen Gr&uuml;nden aufbewahrt werden m&uuml;ssen, gesperrt. Diese Daten stehen einer weiteren Verwendung nicht mehr zur Verf&uuml;gung.</p>
                    <br />
                    <p>Der Verantwortliche unterliegt verschiedenen Aufbewahrungs- und Dokumentationspflichten, die sich unter anderem aus dem Handelsgesetzbuch (HGB) und der Abgabenordnung (AO) ergeben. Die dort vorgegebenen Fristen zur Aufbewahrung bzw. Dokumentation betragen zwei bis zehn Jahre.</p>
                    <p>Schlie&szlig;lich beurteilt sich die Speicherdauer auch nach den gesetzlichen Verj&auml;hrungsfristen, die zum Beispiel nach den &sect;&sect; 195 ff. des B&uuml;rgerlichen Gesetzbuches (BGB) in der Regel drei Jahre, in gewissen F&auml;llen aber auch bis zu drei&szlig;ig Jahre betragen k&ouml;nnen.</p>
                    <p>Die mittels einer Einwilligung (zu Marketingzwecken) erhobenen personenbezogenen Daten werden zeitlich unbefristet gespeichert. Diese Daten werden gel&ouml;scht, sofern der Kunde in eine weitere Verarbeitung und Nutzung seiner Daten nicht ausdr&uuml;cklich eingewilligt hat.</p>
                    <p>Die mittels Google Analytics erhobenen Daten werden 26 Monate gespeichert.</p>
                    <br />
                    <p>8. Datenschutzrechte</p>
                    <p>Jeder Kunde hat das Recht auf Auskunft nach Artikel 15 DSGVO, das Recht auf Berichtigung nach Artikel 16 DSGVO, das Recht auf L&ouml;schung nach Artikel 17 DSGVO, das Recht auf Einschr&auml;nkung der Verarbeitung nach Artikel 18 DSGVO, das Recht auf Widerspruch nach Artikel 21 DSGVO sowie das Recht auf Daten&uuml;bertragbarkeit nach Artikel 20 DSGVO. Beim Auskunftsrecht und beim L&ouml;schungsrecht gelten die Einschr&auml;nkungen nach &sect;&sect; 34 und 35 BDSG. Dar&uuml;ber hinaus besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbeh&ouml;rde (Artikel 77 DSGVO i. V. m. &sect; 19 BDSG).</p>
                    <p>Entsprechende Anliegen sind an die unter Punkt 1 genannte Adresse oder an walletads@admiral.studio zu richten.</p>
                    <br />
                    <p>9. Widerspruchsrecht und sonstige Rechte</p>
                    <p>Hat der Kunde seine Einwilligung zu der Verarbeitung der ihn betreffenden personenbezogenen Daten f&uuml;r einen oder mehrere bestimmte Zwecke gegeben, steht dem Kunden die M&ouml;glichkeit des Widerrufs der Einwilligung mit Wirkung f&uuml;r die Zukunft zu.</p>
                    <p>Insbesondere steht dem Kunden gegen die Verarbeitung der personenbezogenen Daten zur Analyse der Webseite oder um St&ouml;rungen oder Fehler an der Webseite zu erkennen, einzugrenzen oder zu beseitigen, das Recht zu, der Verarbeitung jederzeit kostenfrei mit Wirkung f&uuml;r die Zukunft zu widersprechen. Hierzu gen&uuml;gt eine E-Mail an walletads@admiral.studio oder an die unter Punkt 1 genannte Adresse.</p>
                    <p>Dar&uuml;ber hinaus steht dem Kunden gegen die Verarbeitung der personenbezogenen Daten zu Marketingzwecken, das Recht zu, der Verarbeitung jederzeit kostenfrei mit Wirkung f&uuml;r die Zukunft zu widersprechen. Hierzu gen&uuml;gt eine E-Mail an walletads@admiral.studio oder an die unter Punkt 1 genannte Adresse.</p>
                    <p>Jede betroffene Person hat unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Aufsichtsbeh&ouml;rde, insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutma&szlig;lichen Versto&szlig;es, wenn die betroffene Person der Ansicht ist, dass die Verarbeitung der sie betreffenden personenbezogenen Daten gegen diese Verordnung verst&ouml;&szlig;t.</p>
                    <p>Eine zust&auml;ndige Beh&ouml;rde ist z.B. die Berliner Beauftragte f&uuml;r Datenschutz und Informationsfreiheit, Friedrichstra&szlig;e 219, 10969 Berlin, Deutschland. Der Kunde kann aber auch eine andere w&auml;hlen.</p>
                    <br />
                    <p>10. Pflicht Datenbereitstellung</p>
                    <p>Die Angabe folgender Daten ist zwingend erforderlich (Pflichtangaben):</p>
                    <br />
                    <p>10.1. Erf&uuml;llung des Vertrags</p>
                    <p>Die Angabe folgender Daten ist f&uuml;r einen Vertragsschluss im Rahmen der Anmeldung zwingend erforderlich (Pflichtangaben):</p>
                    <br />
                    <p>&ndash; Adresse (Stra&szlig;e, Hausnummer, PLZ, Ort, Land)</p>
                    <p>&ndash; Steuernummer</p>
                    <p>&ndash; Vor- und Nachname</p>
                    <p>&ndash; Telefon</p>
                    <p>&ndash; E-Mail-Adresse</p>
                    <p>&ndash; Firma</p>
                    <p>&ndash; USt ID</p>
                    <p>&ndash; W&auml;hrung</p>
                    <p>&ndash; Rechnungs-E-Mail-Adresse</p>
                    <p>&ndash; Kreditkartendaten</p>
                    <br />
                    <p>Alle anderen Angaben sind f&uuml;r die Durchf&uuml;hrung des Vertrags nicht erforderlich und sind somit freiwillig.</p>
                    <p>Wenn die f&uuml;r die Durchf&uuml;hrung des Vertrags erforderlichen Pflichtangaben nicht gegeben werden, findet kein Vertragsschluss statt. Die Nichtangabe der freiwilligen Angaben hat keinen Einfluss auf den Vertragsschluss.</p>
                    <br />
                    <p>10.2. Nutzung des Kontaktformulars oder der Bearbeitung einer sonstigen Anfrage</p>
                    <p>&ndash; F&uuml;r die Bearbeitung einer allgemeinen Anfrage im Rahmen des Kontaktformulars auf der Webseite des Verantwortlichen ist die Angabe folgender Daten zwingend erforderlich (Pflichtangaben): Vorname, Nachname, E-Mail-Adresse, Telefonnummer und Account Name</p>
                    <p>&ndash; F&uuml;r die Bearbeitung einer allgemeinen Anfrage im Rahmen des Kontaktformulars auf Social Media Plattformen ist die Angabe folgender Daten zwingend erforderlich (Pflichtangaben): Vorname, Nachname und E-Mail-Adresse</p>
                    <p>&ndash; F&uuml;r die Bearbeitung einer Anfrage per E-Mail ist die Angabe folgender Daten zwingend erforderlich (Pflichtangaben): Vorname, Nachname, E-Mail-Adresse, Telefonnummer und Account Name</p>
                    <p>&ndash; F&uuml;r die Bearbeitung einer telefonischen Anfrage ist die Angabe folgender Daten zwingend erforderlich (Pflichtangaben): Vorname, Nachname, E-Mail-Adresse, Telefonnummer und Account Name</p>
                    <p>&ndash; F&uuml;r die Bearbeitung einer postalischen Anfrage ist die Angabe folgender Daten zwingend erforderlich (Pflichtangaben): Vorname, Nachname, E-Mail-Adresse, Telefonnummer und Account Name</p>
                    <p>Alle anderen Angaben sind f&uuml;r die Bearbeitung einer Anfrage nicht erforderlich und sind somit freiwillig.</p>
                    <p>Wenn die f&uuml;r die Bearbeitung einer Anfrage erforderlichen Pflichtangaben nicht gegeben werden, findet eine Bearbeitung der Anfrage nicht statt. Die Nichtangabe der freiwilligen Angaben hat keinen Einfluss auf die Bearbeitung der Anfrage.</p>
                    <br />
                    <p>10.3. Webseiten-Analyse, Google Fonts sowie Erkennen, Eingrenzen oder Beseitigen von St&ouml;rungen oder Fehlern</p>
                    <p>Die Deaktivierung der Daten&uuml;bertragung im Rahmen von Google Analytics hat keine Auswirkung auf die Nutzung dieser Webseite.</p>
                    <p>Die Nichtnutzung von Google Fonts hat keine Auswirkungen auf die Nutzung dieser Webseite. In diesem Fall wird eine Standardschrift des Computers des Kunden genutzt.</p>
                    <p>Die Angabe folgender Daten sind zum Erkennen, Eingrenzen oder Beseitigen von Cyber Attacken an der Webseite zwingend erforderlich (Pflichtangaben):</p>
                    <p>&ndash; IP-Adresse</p>
                    <p>&ndash; Referrer URL</p>
                    <p>&ndash; Zeitpunkt</p>
                    <p>&ndash; User-Agent (Browser, Betriebssystem, Sprache)</p>
                    <p>Die Angabe folgender Daten sind zum Erkennen, Eingrenzen oder Beseitigen von Cyber Attacken an der Webseite sind zwingend erforderlich. Ohne diese Daten kann die Website nicht genutzt werden.</p>
                    <br />
                    <p>11. Automatisierte Entscheidungsfindung</p>
                    <p>Eine automatisierte Entscheidungsform einschlie&szlig;lich Profiling findet nicht statt</p>
                </div>
            )
        }
        return (
            <div className={styles.ctnDesc}>
                <Typography variant='h4' fontWeight={"800"} marginBottom={2}>Privacy</Typography>
                <p>Reporting requirement regarding the use and processing of personally identifiable user data</p>

                <br />
                <p>1. Responsible entity and contact details</p>
                <p>The data controller is Admiral Studio GmbH (hereinafter referred to as the controller) and processes the data provided by the data subject (hereinafter referred to as the customer) in accordance with the provisions of the European Data Protection Regulation (hereinafter referred to as the DSGVO).</p>
                <p>The contact details of the controller are:</p>
                <p>Address: Urbanstr. 71, 10967 Berlin, Germany&nbsp;<br/>Telephone: +49 177 314 0680<br/>E-mail: walletads@admiral.studio</p>

                <br />
                <p>2. Data protection officer</p>
                <p>You can reach the data protection officer of Admiral Studio GmbH via e-mail: walletads@admiral.studio.</p>

                <br />
                <p>3. Purpose and legal grounds</p>
                <p>The processing of the customer&rsquo;s personal data is necessary for the fulfilment of a contract to which the customer is a contracting party or for the implementation of pre-contractual measures which are carried out at the request of the customer. The legal basis for this processing is Art. 6 (1) b) DSGVO.</p>
                <p>In the event that the customer uses the contact form on the website of the responsible party or contacts the responsible party in another way, in particular by e-mail, telephone, fax or post, the personal data will be used exclusively to process the customer&rsquo;s request. The legal basis for this processing is the customer&rsquo;s consent in accordance with Art. 6 (1) a) DSGVO.</p>
                <p>In the event that the customer uses the contact form on social media platforms, the personal data will be used to process his enquiry. In addition, the customer&rsquo;s personal data is used for marketing purposes (direct advertising). The legal basis for this processing is the customer&rsquo;s consent pursuant to Art. 6 (1) a) DSGVO. The data controller points out the customer&rsquo;s right to object. The customer will receive more detailed information under point 9 of this declaration.</p>

                <br />
                <p>In the other cases in which personal data are processed, the processing is carried out to protect the legitimate interests of the controller, namely to analyse the use of the website by Google Analytics, to integrate external fonts by Google Fonts or Cloudflare in order to detect, limit or eliminate cyberattacks or faults on the website. The legal basis for this processing is Art. 6 (1) f) DSGVO. The controller points out the customer&rsquo;s right to object. The customer receives more detailed information under point 9 of this declaration.</p>

                <br />
                <p>4. Recipients</p>
                <p>The personal data of the customer, which are transmitted to the responsible party, are made accessible to the following recipients as follows:</p>

                <br />
                <p>4.1 Fulfilment of the contract or implementation of pre-contractual measures.</p>
                <p>For the performance of the contract or the execution of pre-contractual measures, the personal data of the customer transmitted to the controller will be made available to the following recipients:</p>
                <p>&bull; Microsoft Corporation, One Microsoft Way, Redmond, WA 980526399, USA</p>
                <p>&bull; Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                <p>&bull; Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA</p>
                <p>&bull; The Constant Company, LLC (Vultr), 319 Clematis Street Suite 900, West Palm Beach, FL 33401, USA</p>
                <p>&bull; Contentful GmbH, Max-Urich-Stra&szlig;e 3, 13355 Berlin, Germany</p>
                <p>&bull; Mailgun Technologies, Inc., 112 E Pecan St. #1135, San Antonio, TX 78205</p>
                <p>Personal data will not be made available to third parties without the written consent of the customer, unless this is required by law.</p>

                <br />
                <p>4.2 Use of the comment function and other forms of contact</p>
                <p>In the case of the use of the contact form on the website of the responsible party, the personal data of the customer, which is transmitted to the responsible party, may be made accessible to the following recipients:</p>
                <p>Atlassian Inc. 1098 Harrison St, San Francisco, CA 94103, USA.</p>
                <p>In case of use of the contact form on the platform https://www.linkedin.com, the personal data of the customer transmitted to the data controller will be made available to the following recipients:</p>
                <p>&bull; Microsoft Corporation, One Microsoft Way, Redmond, WA 980526399, USA</p>
                <p>&bull; Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                <p>&bull; Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA</p>
                <p>&bull; The Constant Company, LLC (Vultr), 319 Clematis Street Suite 900, West Palm Beach, FL 33401, USA</p>
                <p>&bull; Contentful GmbH, Max-Urich-Stra&szlig;e 3, 13355 Berlin, Germany</p>
                <p>&bull; Mailgun Technologies, Inc., 112 E Pecan St. #1135, San Antonio, TX 78205</p>
                <p>Without the customer&rsquo;s consent, the personal data will not be made available to other third parties, unless this is required by law.</p>

                <br />
                <p>4.3 Website analysis</p>
                <p>In order to analyse the use of the website, the personal data of the customer which is transmitted to the responsible person is made accessible to the following recipient:</p>

                <br />
                <p>&ndash; Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                <p>This website uses Google Analytics, a web analytics service provided by Google, Inc (&ldquo;Google&rdquo;). Google Analytics uses &ldquo;cookies&rdquo;, which are text files placed on your computer, to help the website analyse how users use the site. The information generated by the cookie about the use of this website (including the IP address) will be transmitted to and stored by Google on servers in the United States. In the event that IP anonymisation is activated on this website, however, Google will truncate the IP address beforehand within member states of the European Union or in other contracting states to the Agreement on the European Economic Area. Only in exceptional cases will the full IP address be transmitted to a Google server in the USA and shortened there. On behalf of the operator of this website, Google will use this information for the purpose of evaluating your use of the website, compiling reports on website activity and providing other services relating to website activity and internet usage to the website operator. The IP address transmitted by the customer&rsquo;s browser as part of Google Analytics will not be merged with other Google data. The customer may refuse the use of cookies by selecting the appropriate settings on the customer&rsquo;s browser, however please note that if you do this you may not be able to use the full functionality of this website. In addition, the customer can prevent the collection of the data generated by the cookie and related to his use of the website (incl. the IP address) by Google as well as the processing of this data by Google by downloading and installing the browser plug-in available at the following link: https://tools.google.com/dlpage/gaoptout?hl=de. The customer can prevent the collection by Google Analytics by clicking on the following link. An opt-out cookie will be set which will prevent future collection of their data when visiting this website: Deactivate Google Analytics The customer can find more information on this at: https://tools.google.com/dlpage/gaoptout?hl=de or at https://www.google.com/intl/de/analytics/privacyoverview.html (general information on Google Analytics and data protection). The responsible party informs the customer that on this website Google Analytics has been extended by the code &ldquo;anonymizeIp&rdquo; (&ldquo;analytics.js&rdquo;) to ensure anonymised collection of IP addresses (so-called IP masking).</p>

                <br />
                <p>Personal data will not be made available to third parties without the written consent of the customer, unless this is required by law.</p>

                <br />
                <p>4.4 Google Fonts</p>
                <p>For the integration of external fonts by Google Fonts, the personal data of the customer, which are transmitted to the responsible party, are made accessible to the following recipient:</p>
                <p>&bull; Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                <p>This website uses Google Fonts to integrate external fonts. Google provides the fonts. When the customer calls up this website, the required fonts are loaded into the customer&rsquo;s browser cache in order to display the texts and fonts correctly on the page.</p>
                <p>For this purpose, the customer&rsquo;s IP address is transmitted to a server of Google Inc. The customer can obtain further information at https://developers.google.com/fonts/faq and in Google&rsquo;s privacy policy https://policies.google.com/privacy?hl=de.</p>
                <p>Without the written consent of the customer, the personal data will not be made available to other third parties, unless this is required by law.</p>

                <br />
                <p>4.5 Cloudflare Cyber Defence</p>
                <p>In order to defend against cyber attacks, the personal data of the customer that is transmitted to the data controller will be made available to the following recipient:</p>
                <p>&bull; Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA</p>
                <p>Cloudflare is a US company that provides Internet security services (DDOS protection) and distributed DNS services that reside between the visitor and the Cloudflare user&rsquo;s hosting provider and act as a reverse proxy for websites. The service protects the website from cyber attacks. For this purpose, the IP address, time, user agent (browser, operating system and language), referrer and all contact form entries are transmitted to Cloudflare and then forwarded to the website.</p>
                <p>Cloudflare states that with the start of the DSGVO they also comply with it: https://blog.cloudflare.com/keeping-your-gdpr-resolutions/</p>
                <p>Cloudflare is also a member of the EU-US Privacy Shield: https://www.privacyshield.gov</p>
                <p>Without the written consent of the customer, personal data will not be made available to other third parties, unless this is required by law.</p>

                <br />
                <p>5. Cookies</p>
                <p>On various pages, the responsible party uses cookies to make visiting its websites more attractive and to enable the use of certain functions. Cookies are small text files that are stored on the visitor&rsquo;s computer. Most of the cookies used by the responsible party are deleted from the visitor&rsquo;s hard drive at the end of the browser session (so-called session cookies). Other cookies remain on the visitor&rsquo;s computer and enable the responsible party to recognise the visitor&rsquo;s computer on the next visit (so-called permanent cookies). Of course, the customer can reject the cookies at any time, provided that the browser used allows this.</p>

                <br />
                <p>6. Data transfer to third-party countries</p>
                <p>&ndash; In the context of the use of Google Analytics and Google Fonts, a transfer of personal data to Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, takes place.</p>
                <p>An adequacy decision by the European Commission is missing. However, Google LLC is a member of the EU-US Privacy Shield. Further information on the EU-US Privacy Shield can be found at URL:</p>
                <p>https://www.privacyshield.gov</p>
                <p><br/>&ndash; In the context of the use of Vultr (The Constant Company, LLC), a transfer of personal data to The Constant Company, LLC, 319 Clematis Street Suite 900, West Palm Beach, FL 33401, USA, takes place.</p>
                <p>An adequacy decision by the European Commission is missing. The Constant Company, LLC is GDPR ready.</p>

                <br />
                <p>&ndash; In the context of the use of Mailgun, a transfer of personal data to Mailgun Technologies, Inc., 112 E Pecan St. #1135, San Antonio, TX 78205, USA, takes place.</p>
                <p>An adequacy decision by the European Commission is missing. However, Mailgun Technologies, Inc. is a member of the EU-US Privacy Shield. Further information on the EU-US Privacy Shield can be found at URL:</p>
                <p>https://www.privacyshield.gov</p>

                <br />
                <p>&ndash; When using Microsoft, personal data is transferred to Microsoft Corporation, One Microsoft Way, Redmond, WA 98052-6399, USA.</p>
                <p>An adequacy decision of the European Commission is missing. Microsoft is GDPR ready and a member of the EU-US Privacy Shield. For more information on the EU-US Privacy Shield, please visit URL:</p>
                <p>https://www.privacyshield.gov</p>

                <br />
                <p>In the context of the use of Cloudflare, a transfer of personal data to Cloudflare Inc, 101 Townsend St, San Francisco, CA 94107, USA, takes place.</p>
                <p>An adequacy decision of the European Commission is missing. Cloudflare is GDPR ready and a member of the EU-US Privacy Shield. Further information can be found here:</p>
                <p>https://www.privacyshield.gov</p>

                <br />
                <p>7. Duration of information storage</p>
                <p>With the complete execution of the contract, the customer&rsquo;s data, which must be kept for legal reasons, will be blocked. This data is no longer available for further use. After this legal reason has ceased to exist, this blocked data will be deleted.</p>
                <p>In the event that the customer contacts the person responsible or uses the contact form, the personal data will be used for the duration of the processing of the enquiry. Subsequently, the data that must be retained for legal reasons will be blocked. This data is no longer available for further use.</p>
                <p>The responsible party is subject to various storage and documentation obligations, which result from the German Commercial Code (HGB) and the German Fiscal Code (AO), among others. The retention and documentation periods specified there are two to ten years.</p>
                <p>Finally, the storage period is also assessed according to the statutory limitation periods, which, for example, according to &sect;&sect; 195 ff. of the German Civil Code (BGB), are usually three years, but in certain cases can be up to thirty years.</p>
                <p>Personal data collected by means of consent (for marketing purposes) is stored for an unlimited period of time. This data is deleted unless the customer has expressly consented to further processing and use of his data.</p>
                <p>The data collected by means of Google Analytics will be stored for 26 months.</p>

                <br />
                <p>8. Privacy Rights</p>
                <p>Every customer has the right to information according to Article 15 DSGVO, the right to correction according to Article 16 DSGVO, the right to deletion according to Article 17 DSGVO, the right to restriction of processing according to Article 18 DSGVO, the right to object according to Article 21 DSGVO and the right to data portability according to Article 20 DSGVO. With regard to the right to information and the right to erasure, the restrictions pursuant to Sections 34 and 35 BDSG apply. In addition, there is a right of appeal to a data protection supervisory authority (Article 77 DSGVO in conjunction with Section 19 BDSG).</p>
                <p>Corresponding requests should be sent to the address mentioned under point 1 or to walletads@admiral.studio.</p>

                <br />
                <p>9. Right to object and other rights</p>
                <p>If the customer has given his consent to the processing of personal data relating to him for one or more specific purposes, the customer shall be entitled to revoke such consent with effect for the future.</p>
                <p>In particular, the customer has the right to object to the processing of personal data for the analysis of the website or in order to detect, limit or eliminate faults or errors on the website at any time free of charge with effect for the future. For this purpose, it is sufficient to send an e-mail to walletads@admiral.studio or to the address mentioned under point 1.</p>
                <p>In addition, the customer has the right to object to the processing of personal data for marketing purposes at any time and free of charge with effect for the future. For this purpose, it is sufficient to send an e-mail to walletads@admiral.studio or to the address mentioned under point 1.</p>
                <p>Without prejudice to any other administrative or judicial remedy, every data subject shall have the right to lodge a complaint with a supervisory authority, in particular in the Member State of his or her residence, place of work or the place of the alleged infringement, if the data subject considers that the processing of personal data relating to him or her infringes this Regulation.</p>
                <p>A competent authority is, for example, the Berlin Commissioner for Data Protection and Freedom of Information, Friedrichstra&szlig;e 219, 10969 Berlin, Germany. However, the customer may also choose another one.</p>

                <br />
                <p>10. Mandatory data provision</p>
                <p>The following data must be provided (mandatory data):</p>

                <br />
                <p>10.1 Fulfilment of the contract</p>
                <p>The provision of the following data is mandatory for the conclusion of a contract in the context of registration as an advertiser (mandatory data):</p>

                <br />
                <p>&ndash; Address (street, house number, postcode, town, country)</p>
                <p>&ndash; Commercial register number</p>
                <p>&ndash; First and last name</p>
                <p>&ndash; Telephone number</p>
                <p>&ndash; E-mail address</p>
                <p>&ndash; Company name</p>
                <p>&ndash; VAT ID</p>
                <p>&ndash; Currency</p>
                <p>&ndash; Billing e-mail address</p>
                <p>&ndash; Credit Card Details</p>

                <br />
                <p>All other information is not required for the execution of the contract and is therefore voluntary.</p>
                <p>If the mandatory information required for the execution of the contract is not provided, no contract will be concluded. Failure to provide the voluntary information shall not affect the conclusion of the contract.</p>

                <br />
                <p>10.2 Use of the contact form or processing of any other request</p>
                <p>For the processing of a general enquiry within the framework of the contact form on the website of the person responsible, the provision of the following data is mandatory (compulsory data): First name, last name, e-mail address, telephone number and account name.</p>
                <p>For the processing of a general enquiry within the framework of the contact form on social media platforms, the provision of the following data is mandatory (compulsory data): First name, last name and email address</p>
                <p>For processing an enquiry by e-mail, it is mandatory to provide the following data (mandatory data): First name, last name, e-mail address, telephone number and account name.</p>
                <p>For processing an enquiry by telephone, it is mandatory to provide the following data (mandatory data): First name, last name, e-mail address, telephone number and account name.</p>
                <p>To process a postal enquiry, the following data must be provided (mandatory data): First name, last name, e-mail address, telephone number and account name.</p>
                <p>All other details are not required for processing an enquiry and are therefore voluntary.</p>
                <p>If the mandatory information required for processing an enquiry is not provided, the enquiry will not be processed. Failure to provide the voluntary information will not affect the processing of the request.</p>

                <br />
                <p>10.3 Website analysis, Google fonts and detecting, limiting or eliminating malfunctions or errors</p>
                <p>The deactivation of data transmission within the scope of Google Analytics has no effect on the use of this website.</p>
                <p>The non-use of Google Fonts has no effect on the use of this website. In this case, a standard font of the customer&rsquo;s computer is used.</p>
                <p>The provision of the following data is mandatory for the detection, containment or elimination of cyber attacks on the website (mandatory data):</p>
                <p>&ndash; IP address</p>
                <p>&ndash; Referrer URL</p>
                <p>&ndash; time</p>
                <p>&ndash; User agent (browser, operating system, language)</p>
                <p>The following data is mandatory for the detection, limitation or elimination of cyber attacks on the website. Without this data, the website cannot be used.</p>

                <br />
                <p>11. Automated decision-making</p>
                <p>An automated decision-making process including profiling does not take place.</p>
            </div>
        )
    }

    function renderHeader(){
        return (
            <div className={styles.ctnHeader}>
                <div className={styles.ctnLeft}>
                    <Typography onClick={() => {setLanguage('ge')}} variant='h6' color="#7589FA" fontWeight={"800"}>DEUTSCHE VERSION</Typography>
                    <Typography onClick={() => {setLanguage('en')}} variant='h6' color="#7589FA" fontWeight={"800"}>ENGLISH VERSION</Typography>
                </div>
                <div className={styles.ctnRight}>
                    <Link href="/">
                        <a>
                            <img src={appIcon} alt="wallet-ads" />
                        </a>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <Page title="Privacy">
            <div className={styles.ctnRoot}>
                <div className={styles.ctnContent}>
                    {renderHeader()}
                    {renderContent()}
                </div>
                <AuthFooter />
            </div>
        </Page>
    )
}