import { Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import AuthFooter from '../../components/auth-footer';
import Page from '../../components/Page';
import useStyles from './styles';

const appIcon = '/assets/wallet_ads_logo.png'

export default function Privacy(){
    const styles = useStyles()
    const [language, setLanguage] = useState('en')

    function renderContent(){
        if(language === 'ge'){
            return (
                <div className={styles.ctnDesc}>
                    <Typography variant='h4' fontWeight={"800"} marginBottom={2}>Admiral Studio GmbH &ndash; Allgemeine Gesch&auml;ftsbedingungen&nbsp;</Typography>
                    <Typography paragraph>ALLGEMEINE GESCH&Auml;FTSBEDINGUNGEN (AGB) F&Uuml;R NUTZER</Typography>
                    <Typography paragraph>Zum Betrieb von Accounts auf WALLETADS</Typography>
                    <br />
                    <Typography paragraph>INHALTSVERZEICHNIS</Typography>
                    <Typography paragraph>1. Geltungsbereich / Definitionen</Typography>
                    <Typography paragraph>2. Vertragsschluss</Typography>
                    <Typography paragraph>3. Teilnahme</Typography>
                    <Typography paragraph>4. Werbemittel</Typography>
                    <Typography paragraph>5. Verg&uuml;tung</Typography>
                    <Typography paragraph>6. Haftung des Advertisers</Typography>
                    <Typography paragraph>7. Haftung von Admiral Studio</Typography>
                    <Typography paragraph>8. Datenschutz</Typography>
                    <Typography paragraph>9. &Auml;nderung</Typography>
                    <Typography paragraph>10. K&uuml;ndigung</Typography>
                    <Typography paragraph>11. Sonstiges</Typography>
                    <Typography paragraph>12. Salvatorische Klausel</Typography>
                    <br />
                    <Typography paragraph>1. GELTUNGSBEREICH / DEFINITIONEN</Typography>
                    <Typography paragraph>1.1. Die nachstehenden Allgemeinen Gesch&auml;ftsbedingungen sind Bestandteil eines jeden Vertrages zwischen</Typography>
                    <Typography paragraph>der Admiral Studio GmbH,&nbsp;Urbanstr. 71,&nbsp;10967 Berlin&nbsp;(im Folgenden Admiral Studio genannt) und dem Vertragspartner.</Typography>
                    <Typography paragraph>1.2. Admiral Studio erbringt ihre Dienste, Leistungen und Lieferungen f&uuml;r Advertiser ausschlie&szlig;lich auf der Grundlage dieser Allgemeinen Gesch&auml;ftsbedingungen. Admiral Studio ist im &Uuml;brigen berechtigt, die Leistungserbringung oder Teile hiervon zur selbst&auml;ndigen Erledigung auf Drittdienstleister oder Erf&uuml;llungsgehilfen zu &uuml;bertragen.</Typography>
                    <Typography paragraph>1.3. Die G&uuml;ltigkeit dieser Allgemeinen Gesch&auml;ftsbedingungen f&uuml;r Advertiser erstreckt sich auf alle f&uuml;r Advertiser angebotenen Leistungen von Admiral Studio. Der Advertiser erkennt mit der Inanspruchnahme der Leistungen von Admiral Studio diese Allgemeinen Gesch&auml;ftsbedingungen f&uuml;r Advertiser als f&uuml;r ihn verbindlich an.</Typography>
                    <Typography paragraph>1.4. Neben den vorliegenden Allgemeinen Gesch&auml;ftsbedingungen f&uuml;r Advertiser wird auch die jeweils g&uuml;ltige Preisliste von Admiral Studio Vertragsbestandteil.</Typography>
                    <Typography paragraph>1.5. Es gelten f&uuml;r die Anwendung und Auslegung des Vertrages nachfolgende Definitionen:</Typography>
                    <Typography paragraph>Admiral Studio</Typography>
                    <Typography paragraph>Admiral Studio &uuml;bermittelt mit seiner Plattform WALLETADS die Werbung von Advertisern in Cryptocurrency-Wallets von Cryptocurrency-Wallet Usern.&nbsp;</Typography>
                    <Typography paragraph>WALLETADS</Typography>
                    <Typography paragraph>WALLETADS ist die Werbeplattform von Admiral Studio, &uuml;ber die Werbetreibende Werbekampagnen erstellen, planen und aufsetzen k&ouml;nnen. Durch die Erstellung von Werbekampagnen werden Werbeanzeigen von Werbetreibenden in die Cryptocurrency-Wallets von Cryptocurrency-Wallet Usern &uuml;bertragen.</Typography>
                    <Typography paragraph>Cryptocurrency-Wallet User</Typography>
                    <Typography paragraph>Eine Cryptocurrency-Wallet User entspricht einer Cryptocurrency-Wallet ID, unabh&auml;ngig vom Anbieter dieser Wallet.&nbsp;</Typography>
                    <Typography paragraph>Double Opt-In</Typography>
                    <Typography paragraph>Beim &bdquo;Double Opt-In&ldquo; erfolgt der Eintrag in eine Abonnentenliste in zwei Schritten:</Typography>
                    <Typography paragraph>1. Schritt: Auf Anfrage erh&auml;lt der Interessent eine E-Mail-Nachricht mit einem individuellen Best&auml;tigungslink.</Typography>
                    <Typography paragraph>2. Schritt: Erst wenn der Interessent diesen Best&auml;tigungslink aktiv angeklickt und somit best&auml;tigt hat, wird er in die Abonnentenliste eingetragen.</Typography>
                    <Typography paragraph>Advertiser</Typography>
                    <Typography paragraph>Der Advertiser ist in der Regel ein Unternehmen, das durch Admiral Studio &uuml;bermittelt, in den Cryptocurrency-Wallets von Cryptocurrency-Wallet Usern wirbt, und das gegen&uuml;ber Admiral Studio nach der jeweils geltenden Preisliste und im Werbeerfolgsfall gem&auml;&szlig; den vereinbarten Konditionen entgeltpflichtig wird.</Typography>
                    <Typography paragraph>Vertragspartner</Typography>
                    <Typography paragraph>Vertragspartner von Admiral Studio sind Advertiser.</Typography>
                    <Typography paragraph>Werbemittel</Typography>
                    <Typography paragraph>Jede Form von Werbemitteln (z.B. Banner, Texte, Flash-Animationen u.&auml;.), die der Advertiser zu Werbezwecken Admiral Studio zur Verf&uuml;gung stellt.</Typography>
                    <Typography paragraph>Werbeplattform</Typography>
                    <Typography paragraph>Ein im Admiral Studio Online-System als Werbeplattform hinterlegtes digitales Medium (Werbereichweitentr&auml;ger); insbesondere die Cryptocurrency-Wallet der Cryptocurrency-Wallet User.</Typography>
                    <Typography paragraph>2. VERTRAGSSCHLUSS</Typography>
                    <Typography paragraph>2.1. Der Vertragsschluss kommt zwischen Admiral Studio und dem Advertiser selbst zustande. In bestimmten F&auml;llen kann es sein, dass der Advertiser mit Admiral Studio erg&auml;nzende Bedingungen zur Teilnahme an WALLETADS vereinbart. Diese Bedingungen werden physisch im Online-System von Admiral Studio hinterlegt.</Typography>
                    <Typography paragraph>2.2. Advertiser bei Admiral Studio k&ouml;nnen nur juristische Personen sowie unbeschr&auml;nkt gesch&auml;ftsf&auml;hige nat&uuml;rliche Personen werden. Es besteht kein Anspruch auf Teilnahme.</Typography>
                    <Typography paragraph>2.3. F&uuml;r die Anmeldung als Advertiser ist die Vorlage eines g&uuml;ltigen Gewerbenachweises oder Handelsregisterauszuges erforderlich.</Typography>
                    <Typography paragraph>2.4. Meldet der Mitarbeiter einer juristischen Person diese als Advertiser bei Admiral Studio an, so bedarf es der Vorlage einer schriftlichen Vollmacht. Gleiches gilt, wenn ein sonstiger Dritter (z.B. eine Agentur) einen Advertiser in dessen Auftrag anmeldet oder in dessen Auftrag gegen&uuml;ber Admiral Studio agiert.</Typography>
                    <Typography paragraph>2.5. Ein Vertrag kommt erst dann zustande, wenn Admiral Studio die Anmeldung des Advertisers durch schriftlichen Vertragsschluss best&auml;tigt.</Typography>
                    <Typography paragraph>2.6. Bei der Anmeldung hat der Advertiser die geforderten Angaben vollst&auml;ndig und wahrheitsgem&auml;&szlig; anzugeben. Der Advertiser hat &Auml;nderungen unverz&uuml;glich, sp&auml;testens jedoch innerhalb von zwei Wochen nach &Auml;nderungseintritt, selbst&auml;ndig in das Online-System von Admiral Studio einzupflegen. &Auml;nderungen in der Vertragspartnerschaft, beispielsweise durch Umfirmierung, &Uuml;bernahme, Verlagerung des Gesch&auml;ftssitzes etc. hat der Advertiser schriftlich mit entsprechenden Belegen wie Handelsregisterausz&uuml;gen und/oder Gewerbenachweisen gegen&uuml;ber Admiral Studio anzuzeigen.</Typography>
                    <Typography paragraph>2.7. Der Advertiser stimmt in den Empfang von Nachrichten per E-Mail, SMS oder anderen verf&uuml;gbaren Kommunikationsplattformen (wie z.B. WhatsApp) durch Admiral Studio und f&uuml;r ihre Vertragspartner zu. Widerspricht der Advertiser dem Empfang solcher Nachrichten, so handelt es sich um eine konkludente K&uuml;ndigung des Vertrages.</Typography>
                    <Typography paragraph>2.8. Der Advertiser verpflichtet sich, bei allen Aktivit&auml;ten &uuml;ber Admiral Studio die geltenden Gesetze zu beachten. Angemeldet werden d&uuml;rfen nur Advertiser und Werbemittel, deren Inhalte nicht gegen das geltende Recht der Bundesrepublik Deutschland und die guten Sitten versto&szlig;en. Die Pr&uuml;fungspflicht hierf&uuml;r obliegt allein dem Advertiser. Gleichwohl ist Admiral Studio befugt, die beworbenen Webseiten und Werbemittel des Advertisers auf seine Inhalte hin zu untersuchen und gegebenenfalls abzuschalten. Die Untersuchung kann auch mit technischen Mitteln erfolgen. Admiral Studio wird eventuelle Schadenersatzanspr&uuml;che aufgrund von Urheberrechtsverletzungen durch Advertiser Content (z.B. Bilder) an den Advertiser weitergeben. Siehe auch: Beschluss des Landgerichts Hamburg zur Linkhaftung (Az. 310 O 402/16).</Typography>
                    <Typography paragraph>2.9. Der Advertiser gew&auml;hrleistet, dass er keine Daten speichert oder weiterleitet, die die technische Infrastruktur und Betriebsabl&auml;ufe von Admiral Studio sch&auml;digen k&ouml;nnen (bspw. Viren, Trojaner, u.&auml;.).</Typography>
                    <Typography paragraph>2.10. Admiral Studio bleibt es unbenommen, dar&uuml;ber hinaus auch als Advertiser oder Agentur t&auml;tig zu werden.</Typography>
                    <Typography paragraph>2.11. Admiral Studio kann mit dem Advertiser als Referenz werben und dazu den jeweiligen Namen und das Logo in allen Medien verwenden.</Typography>
                    <Typography paragraph>3. TEILNAHME</Typography>
                    <Typography paragraph>3.1. F&uuml;r den Advertiser ist die Nutzung von WALLETADS kostenpflichtig. Es gelten die Preise der jeweils online ver&ouml;ffentlichten aktuellen Preisliste.</Typography>
                    <Typography paragraph>3.2. F&uuml;r die Erstellung von Werbekampagnen &uuml;ber Admiral Studio hat der Advertiser eine entsprechende w&auml;hrungsspezifische Anzahlungssumme im Voraus zu leisten. Hierf&uuml;r erh&auml;lt der Advertiser nach Erstellung der Werbekampagne eine Rechnung &uuml;ber die Kosten. S&auml;mtliche Transaktionskosten (z.B. Entgelte im Zahlungsverkehr) hat der Advertiser zu tragen.</Typography>
                    <Typography paragraph>3.3. Der Zugang des Advertiser wird nach wirksamen Vertragsschluss durch Admiral Studio freigeschaltet. Soweit nicht anders vereinbart, ist die w&auml;hrungsspezifische, in der aktuellen Preisliste definierte Mindestanzahlung einzuzahlen.</Typography>
                    <Typography paragraph>3.4. Der Advertiser verpflichtet sich, nach Anforderung durch Admiral Studio, die auch per E-Mail, SMS oder anderen verf&uuml;gbaren Kommunikationsplattformen (wie z.B. WhatsApp) versendet werden kann, offene Zahlungen umgehend zu begleichen. Sinkt der Kontostand des Advertisers auf das w&auml;hrungsspezifische Mindestguthaben, kann Admiral Studio den Account des Advertisers deaktivieren und die Werbemittel des Advertisers abschalten.</Typography>
                    <Typography paragraph>3.5. Rechnungen von Admiral Studio sind sofort nach Erhalt der Rechnung zahlbar. Teilzahlungen f&uuml;hren nicht zu Start einer Werbekampagne. Der Advertiser ist zum Abzug von Skonti nicht berechtigt.</Typography>
                    <Typography paragraph>3.6. Admiral Studio erstellt kampagnenspezifische Abrechnungen &uuml;ber das verbrauchte Advertiser-Guthaben. Weist das Advertiserkonto kein positives Guthaben zum Abrechnungszeitpunkt auf, erh&auml;lt der Advertiser die jeweiligen kampagnenspezifischen Abrechnungen r&uuml;ckwirkend erst, nachdem sein Guthaben-Konto bei Admiral Studio wieder einen Positiv-Betrag aufweist.</Typography>
                    <Typography paragraph>3.7. Die Rechnungsstellung an den Advertiser durch Admiral Studio erfolgt ausschlie&szlig;lich im PDF-Format auf elektronischem Weg per E-Mail. Zudem werden die Rechnungen zum Download im Advertiser-Login Bereich von Admiral Studio bereitgestellt. Auf eine postalische Zusendung der Rechnungen verzichtet der Advertiser ausdr&uuml;cklich.</Typography>
                    <Typography paragraph>4. WERBEMITTEL</Typography>
                    <Typography paragraph>4.1. Der Advertiser stellt f&uuml;r seine Werbekampagnen in geeigneter Form die Werbemittel einschlie&szlig;lich hierf&uuml;r ben&ouml;tigter Codes, Hyperlinks, u.&auml;. zur Verf&uuml;gung.&nbsp;</Typography>
                    <Typography paragraph>4.2. Ausschlie&szlig;lich der Advertiser ist f&uuml;r die ordnungs- und funktionsf&auml;hige Integration der von Admiral Studio bereitgestellten Tracking-Codes verantwortlich.</Typography>
                    <Typography paragraph>4.3. Die Platzierung sowie die H&auml;ufigkeit der Einbindung von bereitgestellten Werbemitteln kann Admiral Studio nach eigenem Ermessen t&auml;tigen. Der Advertiser hat darauf keinen Einfluss, solange es seinen wirtschaftlichen Interessen nicht widerspricht.</Typography>
                    <Typography paragraph>5. VERG&Uuml;TUNG</Typography>
                    <Typography paragraph>5.1. Die Konditionen der Verg&uuml;tung im Rahmen der Werbekampagnen werden zwischen Admiral Studio und dem Advertiser verhandelt.</Typography>
                    <Typography paragraph>5.2. Admiral Studio ist berechtigt, jederzeit ohne Angabe von Gr&uuml;nden die Bewerbung eines Advertiser auszusetzen oder zu pausieren.</Typography>
                    <Typography paragraph>5.3. Verg&uuml;tungen f&uuml;r Transaktionen, die auf Basis von Pay per Airdrop oder Pay per Sendout abgerechnet werden, sind sofort f&auml;llig und gelten grunds&auml;tzlich als endg&uuml;ltig verg&uuml;tungspflichtig anerkannt. Eine nachtr&auml;gliche Stornierung, auch in Teilen, ist in jedem Fall ausgeschlossen.</Typography>
                    <Typography paragraph>6. HAFTUNG DES ADVERTISERS</Typography>
                    <Typography paragraph>6.1. Der Advertiser haftet gegen&uuml;ber Admiral Studio insbesondere f&uuml;r die von ihm zur Verf&uuml;gung gestellten Werbemittel. Dies gilt auch f&uuml;r etwaige, durch den Advertiser zu verantwortenden Umsatzausf&auml;lle auf Grund defekter oder falscher Werbemittel (dies betrifft auch wom&ouml;glich falsche Formate oder falsche Gr&ouml;&szlig;e des Werbemittels) und Werbemittel-Weiterleitungen.</Typography>
                    <Typography paragraph>6.2. Der Advertiser stellt Admiral Studio von s&auml;mtlichen Schadensersatzanspr&uuml;chen, Haftungsanspr&uuml;chen und jedweden Kosten frei, die Admiral Studio dadurch entstehen, dass ein Anspruch gegen Admiral Studio geltend gemacht wird, demzufolge verwendete Werbung des Advertiser gegen das Wettbewerbsrecht, gewerbliche Schutzrechte Dritter oder andere Gesetze bzw. Verordnungen verst&ouml;&szlig;t.</Typography>
                    <Typography paragraph>7. HAFTUNG VON ADMIRAL STUDIO</Typography>
                    <Typography paragraph>7.1. Admiral Studio wird den in der Internetbranche &uuml;blichen Aufwand betreiben, um zu gew&auml;hrleisten, dass das Online-System 24 Stunden am Tag verf&uuml;gbar bleibt. Ausgenommen hiervon sind Unterbrechungen, die f&uuml;r erforderliche Wartungsma&szlig;nahmen &uuml;blich sind oder durch Dritte, nicht mit Admiral Studio verbundene Unternehmen verschuldet sind. Sollte das Online-System gleichwohl ausfallen, wird sich Admiral Studio im Rahmen ihrer M&ouml;glichkeiten sofort bem&uuml;hen, die Verf&uuml;gbarkeit wiederherzustellen. Die Vertragsparteien erkennen an, dass in Ausnahmef&auml;llen eine geringe Anzahl von Transaktionen vom Online-System nicht erfasst bzw. protokolliert werden k&ouml;nnen. Ein Anspruch gegen Admiral Studio seitens des Advertisers besteht hieraus nicht.</Typography>
                    <Typography paragraph>7.2. Admiral Studio haftet nicht f&uuml;r h&ouml;here Gewalt und f&uuml;r Ereignisse, die nicht im Einflussbereich von Admiral Studio liegen (z.B. Naturgewalt, Krieg, Viren). Admiral Studio haftet demzufolge auch nicht f&uuml;r die daraus resultierende Unterbrechung bzw. Zerst&ouml;rung von Daten. Es obliegt dem Advertiser, entsprechende Sicherungskopien anzufertigen. Eine technische Sicherung der Daten durch Admiral Studio erfolgt mindestens w&ouml;chentlich.</Typography>
                    <Typography paragraph>7.3. Admiral Studio garantiert keine Umsatzerfolge.</Typography>
                    <Typography paragraph>7.4. F&uuml;r Sch&auml;den, die aus der Verletzung der Datenaktualisierungspflicht (vgl. Punkt 2.6.) entstehen, haftet Admiral Studio nicht. Entsteht daraus bei Admiral Studio ein Schaden, muss dieser vom Advertiser in vollem Umfang ersetzt werden.</Typography>
                    <Typography paragraph>7.5. F&uuml;r Sch&auml;den, die aus der Fehlerhaftigkeit der Software oder Hardware der Parteien sowie der Verf&uuml;gbarkeit bzw. Funktionsweise des Internets entstehen, &uuml;bernimmt Admiral Studio keinerlei Gew&auml;hrleistung.</Typography>
                    <Typography paragraph>7.6. F&uuml;r andere als durch Verletzung von Leben, K&ouml;rper und Gesundheit entstehende Sch&auml;den haftet Admiral Studio lediglich, soweit diese auf vors&auml;tzlichem oder grob fahrl&auml;ssigem Handeln oder auf schuldhafter Verletzung einer wesentlichen Vertragspflicht durch Admiral Studio, ihre Mitarbeiter oder ihre Erf&uuml;llungsgehilfen beruht. Dies gilt auch f&uuml;r Sch&auml;den aus der Verletzung von Pflichten bei Vertragsverhandlungen sowie aus der Vornahme von unerlaubten Handlungen. Eine dar&uuml;berhinausgehende Haftung auf Schadensersatz ist ausgeschlossen.</Typography>
                    <Typography paragraph>7.7. Die Haftung ist au&szlig;er bei vors&auml;tzlichem oder grob fahrl&auml;ssigem Verhalten, der Verletzung einer Kardinalspflicht oder der Verletzung von Leben, K&ouml;rper und Gesundheit durch Admiral Studio, ihre Mitarbeiter, Drittdienstleister oder ihre Erf&uuml;llungsgehilfen auf die bei Vertragsschluss typischer Weise vorhersehbaren Sch&auml;den und im &Uuml;brigen der H&ouml;he nach auf die vertragstypischen Durchschnittssch&auml;den begrenzt, h&ouml;chstens jedoch auf 5.000,- EUR pro Schadenfall. Dies gilt auch f&uuml;r mittelbare Sch&auml;den, insbesondere den entgangenen Gewinn.</Typography>
                    <Typography paragraph>7.8. Die Bestimmungen des Produkthaftungsgesetzes bleiben unber&uuml;hrt.</Typography>
                    <Typography paragraph>8. DATENSCHUTZ</Typography>
                    <Typography paragraph>8.1. Admiral Studio ist berechtigt, die personenbezogenen Daten des Advertisers und seiner Erf&uuml;llungsgehilfen (Agenturen) zu erheben, zu verarbeiten und zu speichern. Dabei werden die geltenden datenschutzrechtlichen Vorschriften eingehalten.</Typography>
                    <Typography paragraph>8.2. Admiral Studio ist ebenfalls berechtigt, die durch den Advertiser im Admiral Studio Online-System hinterlegten Daten an externe Dienstleister zu Zwecken der Adress- und Datenvalidierung weiterzugeben. Dabei werden die geltenden datenschutzrechtlichen Vorschriften eingehalten.</Typography>
                    <Typography paragraph>8.3. W&uuml;nscht der Advertiser eine vollst&auml;ndige L&ouml;schung seiner Daten, so wendet er sich hierf&uuml;r an den Datenschutzbeauftragten von Admiral Studio. Email: walletads@admiral.studio</Typography>
                    <Typography paragraph>8.4. Admiral Studio ist berechtigt, alle notwendigen technischen Ma&szlig;nahmen zu ergreifen und einzusetzen, um die Aufrechterhaltung des Netzwerkes zu gew&auml;hrleisten und etwaigen Missbrauch festzustellen. &sect;&sect; 109 ff. TKG gelten hierf&uuml;r sinngem&auml;&szlig;.</Typography>
                    <Typography paragraph>9. &Auml;NDERUNGEN</Typography>
                    <Typography paragraph>9.1. &Auml;nderungen der Allgemeinen Gesch&auml;ftsbedingungen f&uuml;r Advertiser sind jederzeit m&ouml;glich und werden unter Einhaltung einer angemessenen Frist angek&uuml;ndigt. Sie werden per E-Mail zug&auml;nglich gemacht.</Typography>
                    <Typography paragraph>9.2. Erfolgt kein ausdr&uuml;cklicher, schriftlicher Widerspruch innerhalb der Ank&uuml;ndigungsfrist, gelten die neuen Allgemeinen Gesch&auml;ftsbedingungen f&uuml;r Advertiser als angenommen, wenn Admiral Studio zu Beginn der Frist den Advertiser auf die vorgesehene Bedeutung des Verfahrens hingewiesen hat.</Typography>
                    <Typography paragraph>9.3. Erfolgt ein ausdr&uuml;cklicher, schriftlicher Widerspruch, so gilt das Vertragsverh&auml;ltnis als gek&uuml;ndigt i.S.d. Punktes 10.1.</Typography>
                    <Typography paragraph>10. K&Uuml;NDIGUNG</Typography>
                    <Typography paragraph>10.1. Der Vertrag kann mit einer Frist von 4 Wochen zum Monatsende durch jeden Vertragspartner gek&uuml;ndigt werden.</Typography>
                    <Typography paragraph>10.2. Die K&uuml;ndigung durch einen Advertiser kann im Originalschreiben oder per E-Mail erfolgen. Eine K&uuml;ndigung durch Admiral Studio bedarf keiner Schriftform und kann insbesondere auch per E-Mail erfolgen.</Typography>
                    <Typography paragraph>10.3. Bei einer K&uuml;ndigung des Vertrages seitens des Advertisers m&uuml;ssen alle bestehenden Kampagnen zu Vertragsende abgeschlossen sein.</Typography>
                    <Typography paragraph>10.4. Bis zum Vertragsende sind von dem Advertiser alle offenen Rechnungen sofort zu begleichen.</Typography>
                    <Typography paragraph>10.5. Das Recht zur au&szlig;erordentlichen K&uuml;ndigung bleibt durch Punkt 10.1. unber&uuml;hrt.</Typography>
                    <Typography paragraph>10.6. Bei einem rechnerischen Minusguthaben sind etwaige Nachforderungen unverz&uuml;glich auszugleichen.</Typography>
                    <Typography paragraph>10.7. Admiral Studio steht ein au&szlig;erordentliches K&uuml;ndigungsrecht bei Vorliegen eines wichtigen Grundes zu.</Typography>
                    <Typography paragraph>11. SONSTIGES</Typography>
                    <Typography paragraph>11.1. Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.</Typography>
                    <Typography paragraph>11.2. Sofern der Advertiser Kaufmann ist, eine juristische Person des &ouml;ffentlichen Rechts oder &ouml;ffentlich-rechtliches Sonderverm&ouml;gen, oder keinen allgemeinen Gerichtsstand im Inland hat oder nach Vertragsschluss seinen Wohnsitz ins Ausland verlegt oder sein Wohnsitz zum Zeitpunkt der Klageerhebung nicht bekannt ist, ist der Erf&uuml;llungsort und der Gerichtsstand f&uuml;r die sich aus unserem Vertrag ergebenden Streitigkeiten Berlin.</Typography>
                    <Typography paragraph>11.3. Bei Rechtsstreitigkeiten zwischen den Parteien gilt die deutschsprachige Vertragsversion als ma&szlig;geblich.</Typography>
                    <Typography paragraph>12. SALVATORISCHE KLAUSEL</Typography>
                    <Typography paragraph>Sollten Bestimmungen des vorliegenden Vertrags im Sinne der Rechtsprechung in Deutschland ung&uuml;ltig sein oder werden, bleibt hiervon die G&uuml;ltigkeit der &uuml;brigen Bestimmungen unber&uuml;hrt. Anstelle der unwirksamen Bestimmungen oder zur Auff&uuml;llung von L&uuml;cken soll eine angemessene Regelung treten, die dem am n&auml;chsten kommt, was die Vertragsparteien gewollt haben.</Typography>
                    <Typography paragraph>Berlin, September 2022</Typography>
                </div>
            )
        }
        return (
            <div className={styles.ctnDesc}>
                <Typography variant='h4' fontWeight={"800"} marginBottom={2}>Admiral Studio GmbH &ndash; General Terms and Conditions</Typography>
                <Typography variant='h4' fontWeight={"800"}>GENERAL TERMS AND CONDITIONS (GTC) FOR USERS</Typography>
                <Typography paragraph>For the operation of accounts on the WALLETADS online platform</Typography>
                <br />
                <Typography paragraph>TABLE OF CONTENTS</Typography>
                <Typography paragraph>1. Scope of application and definitions</Typography>
                <Typography paragraph>2. Conclusion of contract</Typography>
                <Typography paragraph>3. Participation</Typography>
                <Typography paragraph>4. Advertising media</Typography>
                <Typography paragraph>5. Remuneration</Typography>
                <Typography paragraph>6. Liability of the Advertisers</Typography>
                <Typography paragraph>7. Liability of Admiral Studio</Typography>
                <Typography paragraph>8. Data protection</Typography>
                <Typography paragraph>9. Amendment</Typography>
                <Typography paragraph>10. Termination</Typography>
                <Typography paragraph>11. Miscellaneous</Typography>
                <Typography paragraph>12. Severability Clause</Typography>
                <br />
                <Typography paragraph>1. SCOPE OF APPLICATION AND DEFINITIONS</Typography>
                <Typography paragraph>1.1. The following General Terms and Conditions are an integral part of any contract between&nbsp;</Typography>
                <Typography paragraph>Admiral Studio GmbH,&nbsp;Urbanstr. 71,&nbsp;10967 Berlin&nbsp;(Admiral Studio) and the Contract Partner.</Typography>
                <Typography paragraph>1.2. Admiral Studio provides its services and supplies for Advertisers exclusively on the basis of these General Terms and Conditions of Business for Advertisers. Admiral Studio is also entitled to perform the provision of services or parts thereof themselves or transfer them to third party service providers or subcontractors.</Typography>
                <Typography paragraph>1.3. The validity of these General Terms and Conditions of Business for Advertisers extends to all services offered to advertisers by Admiral Studio. With the use of the services of Admiral Studio, the advertiser acknowledges these General Terms and Conditions of Business for Advertisers as binding.</Typography>
                <Typography paragraph>1.4. In addition to these General Terms and Conditions of Business for Advertisers, the valid Admiral Studio price list is also an integral part of the contract.</Typography>
                <Typography paragraph>1.5. The following definitions apply for the interpretation and application of the contract:</Typography>
                <Typography paragraph>Admiral Studio</Typography>
                <Typography paragraph>With its WALLETADS platform, Admiral Studio transmits advertisements from advertisers into the cryptocurrency wallets of cryptocurrency wallet users.</Typography>
                <Typography paragraph>WALLETADS</Typography>
                <Typography paragraph>WALLETADS is Admiral Studio&rsquo;s advertising platform through which Advertisers can create, schedule and launch advertising campaigns. By creating advertisement campaigns, advertisements from advertisers are set to be transmit into the cryptocurrency wallets of cryptocurrency wallet users.</Typography>
                <Typography paragraph>Cryptocurrency-Wallet User</Typography>
                <Typography paragraph>A cryptocurrency wallet user corresponds to a cryptocurrency wallet ID, regardless of the provider of this wallet.</Typography>
                <Typography paragraph>Double opt-in</Typography>
                <Typography paragraph>In a &quot;double opt-in&quot;, the entry is made in a subscriber list in two steps:</Typography>
                <Typography paragraph>1. Step: On request, the customer receives an e-mail message with an individual confirmation link.</Typography>
                <Typography paragraph>2. Step: The interested party is only entered in the subscriber list once they have actively clicked on the confirmation link and has given their confirmation in this way.</Typography>
                <Typography paragraph>Advertisers</Typography>
                <Typography paragraph>The Advertiser is usually a company which links via Admiral Studio, advertises in the cryptocurrency wallets of cryptocurrency wallet users and is liable to pay a charge to Admiral Studio according to the valid price list and, if the advertising is effective, in accordance with the agreed terms and conditions.</Typography>
                <Typography paragraph>Contract Partner</Typography>
                <Typography paragraph>The contract partners of Admiral Studio are Advertisers.</Typography>
                <Typography paragraph>Advertising media</Typography>
                <Typography paragraph>Any form of advertising media (e.g. banners, text, Flash animations, etc.), which the Advertiser provides Admiral Studio for advertising purposes.</Typography>
                <Typography paragraph>Advertising platform</Typography>
                <Typography paragraph>Digital media stored as an advertising platform in the Admiral Studio online system (advertising distributor); especially the cryptocurrency wallet of cryptocurrency wallet users.</Typography>
                <Typography paragraph>2. CONCLUSION OF CONTRACT</Typography>
                <Typography paragraph>2.1. The contract is made between Admiral Studio and the Advertiser itself. In certain cases, it may be that the Advertiser agrees supplementary conditions with Admiral Studio for participation in WALLETADS. These conditions are physically stored in the Admiral Studio online system.</Typography>
                <Typography paragraph>2.2. Advertisers with Admiral Studio can only be legal persons and fully competent natural persons. There is no claim to participation.</Typography>
                <Typography paragraph>2.3. For registration as Advertisers, the presentation of a valid business registration or commercial register extract is required.</Typography>
                <Typography paragraph>2.4. If an employee of a legal person registers this person with Admiral Studio as an Advertiser, the submission of a written power of attorney is required. The same applies if a third party (e.g. an agency) registers an Advertiser or represents them vis-a-vis Admiral Studio on their behalf.</Typography>
                <Typography paragraph>2.5. A contract only comes into being if Admiral Studio confirms the registration of the Advertiser by means of a written contract.</Typography>
                <Typography paragraph>2.6. When registering, the Advertiser must give the required information completely and truthfully. The Advertiser must make any changes themselves in the Admiral Studio online system without delay, within two weeks after the change occurs at the latest. Changes in the Contractual Partnership, for example through the change of company name, acquisition, relocation of headquarters etc. must be reported by the Advertiser to Admiral Studio in writing with supporting documentation such as commercial register extracts and/or commercial proof.</Typography>
                <Typography paragraph>2.7. The Advertiser agrees to receive messages via email, SMS or other available communication platforms (such as WhatsApp) by Admiral Studio and for its contract partners. If the Advertiser objects to the receipt of such messages, this results in an implicit termination of the contract.</Typography>
                <Typography paragraph>2.8. The Advertiser commits to observing all relevant laws in all activities with Admiral Studio. Only partner programmes and advertising media may be registered which, in their content, do not violate the law of the Federal Republic of Germany and good social morals. The obligation to verify this is the sole responsibility of the Advertiser. Admiral Studio is nevertheless entitled to examine the content of the advertised websites and advertising material of the Advertisers and remove it where appropriate. This examination may be performed using technical means. Admiral Studio will pass any claims for damages on the basis of copyright infringement by Advertiser content (such as images) to the Advertiser. See also: Decision of the District Court of Hamburg on liability for links (File Ref. 310 O 402/16).</Typography>
                <Typography paragraph>2.9. The Advertiser ensures that it neither stores nor forwards data which could endanger the technical infrastructure and operations of Admiral Studio (e.g. viruses, Trojan horses, etc.).</Typography>
                <Typography paragraph>2.10. Admiral Studio is at liberty to also act as an Advertiser or agency.</Typography>
                <Typography paragraph>2.11. Admiral Studio may use the Advertiser in advertisements as a reference and use the name and the logo in all media for this purpose.</Typography>
                <Typography paragraph>3. PARTICIPATION</Typography>
                <Typography paragraph>3.1. For the Advertiser, usage of WALLETADS bears a charge. The prices of the current price list published online apply.</Typography>
                <Typography paragraph>3.2. The Advertiser must pay an appropriate currency-specific deposit in advance for the deployment of advertisements via Admiral Studio. For this, the Advertiser receives a payment invoice upon campaign creation. All the transaction costs (e.g. charges in payment transactions) are borne</Typography>
                <Typography paragraph>by the Advertiser.</Typography>
                <Typography paragraph>3.3. The access of the Advertiser is enabled by Admiral Studio after conclusion of contract. Unless otherwise agreed, the currency-specific minimum payment defined in the current price list must be paid.</Typography>
                <Typography paragraph>3.4. The Advertiser is obliged to immediately pay unpaid invoices upon request by Admiral Studio, such request may be made by email, SMS or other available communication platforms (such as WhatsApp). If the account balance of the Advertiser falls to the currency-specific minimum balance, Admiral Studio may disable the account of the advertiser and deactivate the advertising material of the Advertiser.</Typography>
                <Typography paragraph>3.5. Admiral Studio invoices are payable immediately after receipt of the invoice. Part payments will not lead to the start of an advertising campaign. The Advertiser is not entitled to the deduction of discounts.</Typography>
                <Typography paragraph>3.6. Admiral Studio creates statements for the advertiser credit used on the basis of an advertising campaign. If the Advertiser has a negative account balance for the settlement date, the Advertiser retrospectively receives the respective campaign statements only after it has topped up its Admiral Studio credit account to a positive amount again.</Typography>
                <Typography paragraph>3.7. Invoicing to the advertiser by Admiral Studio takes place exclusively in PDF format electronically by email. Invoices are also available for download in the advertiser login area of Admiral Studio. The Advertiser expressly waives the postal forwarding of invoices.</Typography>
                <Typography paragraph>4. ADVERTISING MEANS</Typography>
                <Typography paragraph>4.1. The Advertiser provides the advertising means, including the required codes, hyperlinks, etc. in an appropriate form.&nbsp;</Typography>
                <Typography paragraph>4.2. The advertiser is solely responsible for the planning and functional integration of tracking codes provided by Admiral Studio.</Typography>
                <Typography paragraph>4.3. The placement as well as the frequency of integration of provided advertising media can be performed at the own discretion of Admiral Studio. The Advertiser has no influence on this, provided its economic interests are not violated.</Typography>
                <Typography paragraph>5. REMUNERATION</Typography>
                <Typography paragraph>5.1. The terms of the repayment in the context of partner programmes are negotiated between Admiral Studio and the Advertiser.&nbsp;</Typography>
                <Typography paragraph>5.2. Admiral Studio is entitled to pause or suspend the advertisements of an Advertiser at any time without indication of reasons.</Typography>
                <Typography paragraph>5.3. Payments for transactions invoiced on the basis of Pay per Airdrop or Pay per Sendout are due immediately and are generally regarded as irrevocably confirmed by the Advertiser and therefore recognised as subject to remuneration. A subsequent cancellation, even in part, is excluded in any case.</Typography>
                <Typography paragraph>6. LIABILITY OF THE ADVERTISER</Typography>
                <Typography paragraph>6.1. The Advertiser is specifically liable vis-a-vis Admiral Studio for advertising media provided by him. This shall also apply for any sales failures for which the Advertiser is responsible due to defective or faulty advertising material (this also applies to faulty format or size of the advertising material) and advertising media transfers.</Typography>
                <Typography paragraph>6.2. The Advertiser exempts Admiral Studio from all claims for damages, liability and any costs as a result of the fact that a claim is made against Admiral Studio as a result of advertising used by the Advertiser being in violation of competition law, industrial property rights of third parties or other laws or regulations.</Typography>
                <Typography paragraph>7. LIABILITY OF ADMIRAL STUDIO</Typography>
                <Typography paragraph>7.1. Admiral Studio will make the effort customary to the internet industry to ensure that the online system is available 24 hours a day. This does not include interruptions which are common for necessary maintenance measures or for which third parties not affiliated with Admiral Studio are responsible. If the online system nevertheless fails, Admiral Studio will immediately try to restore its availability within the scope of their ability. The Contracting Parties recognise that, in exceptional cases, a small number of transactions will not be detected or reported by the online system. The Advertiser is not entitled to make a claim against Admiral Studio as a result of this.</Typography>
                <Typography paragraph>7.2. Admiral Studio shall not be responsible for force majeure and for events that are not in its sphere of influence (e.g. violence, war, viruses). Admiral Studio is therefore also not liable for the resulting disruption or destruction of data. It is the responsibility of the Advertiser to make corresponding backup copies. A technical backup of data is performed by Admiral Studio at least weekly.</Typography>
                <Typography paragraph>7.3. Admiral Studio does not guarantee any sales success.</Typography>
                <Typography paragraph>7.4. Admiral Studio is not liable for damages resulting from the violation of the obligation to update data (cf. Point 2.6). If Admiral Studio incurs damage as a result, this must be compensated by the Advertiser in full.</Typography>
                <Typography paragraph>7.5. Admiral Studio assumes no warranty for damages resulting from the defectiveness of the software or hardware of the parties as well as the availability or the function of the internet.</Typography>
                <Typography paragraph>7.6. Admiral Studio is only liable for damages other than those caused by injury of life, body and health to the extent that this damage is based on deliberate or grossly negligent action or culpable violation of an essential contractual obligation by Admiral Studio, its employees or its vicarious agents. This also applies to damages resulting from the breach of obligations in contract negotiations as well as from the conduct of illicit actions. Any further liability for damages is excluded.</Typography>
                <Typography paragraph>7.7. This liability is limited at the conclusion of a contract to the typical foreseeable damage and otherwise to the amount to the average damage amount typical for such a contract, a maximum of 5,000 euro per case of damage. This also applies for indirect damages, in particular the loss of profit except in the case of intentional or grossly negligent behaviour, the violation of a cardinal obligation or the injury of life, body and health by Admiral Studio, its employees, third-party service providers or its vicarious agents.</Typography>
                <Typography paragraph>7.8. The provisions of the Product Liability Law remain unaffected.</Typography>
                <Typography paragraph>8. DATA PROTECTION</Typography>
                <Typography paragraph>8.1. Admiral Studio is entitled to collect, process and save the personal data of the Advertiser and its vicarious agents (agencies). This is done in compliance with the current data protection regulations.</Typography>
                <Typography paragraph>8.2. Admiral Studio is also entitled to forward data stored by the advertiser in the Admiral Studio online system to external service providers for the purposes of address and data validation. This is done in compliance with the current data protection regulations.</Typography>
                <Typography paragraph>8.3. If the advertiser desires the complete deletion of its data, it must contact the Data Protection Officer of Admiral Studio. email: walletads@admiral.studio</Typography>
                <Typography paragraph>8.4. Admiral Studio is entitled to take all necessary technical measures to ensure the maintenance of the network and to detect any misuse. &sect;&sect; 109 et seq Telecommuncations Law applies mutatis mutandis for this purpose.</Typography>
                <Typography paragraph>9. CHANGES</Typography>
                <Typography paragraph>9.1. Changes to the General Terms and Conditions of Business for Advertisers are possible at any time and will be announced in compliance with a reasonable deadline. These are provided by email.</Typography>
                <Typography paragraph>9.2. If no explicit written objection is made within the period of notice, the new General Business Terms and Conditions for Advertisers is regarded as accepted if Admiral Studio has informed the advertiser of the intended meaning of the procedure at the beginning of the period.</Typography>
                <Typography paragraph>9.3. If there is an express written objection, the contractual relationship is regarded as terminated within the meaning of Point 10.1.</Typography>
                <Typography paragraph>10. TERMINATION</Typography>
                <Typography paragraph>10.1. The contract may be terminated with a period of notice of 4 weeks to the end of the month by either contracting party.</Typography>
                <Typography paragraph>10.2. Termination by an Advertiser can be by original letter or by email. Termination by Admiral Studio needs no written form and can also be by email.</Typography>
                <Typography paragraph>10.3. In the event of a termination of the contract on the part of the Advertiser, all running campaigns must have ended at the end of the contract.</Typography>
                <Typography paragraph>10.4. Until the end of the contract, all open invoices must be paid immediately by the Advertiser.</Typography>
                <Typography paragraph>10.5. The right to extraordinary termination shall remain unaffected by Point 10.1.</Typography>
                <Typography paragraph>10.6. In the event of a negative accounting balance, any claims must be offset immediately.</Typography>
                <Typography paragraph>10.7. Admiral Studio has an extraordinary right of termination if an important reason is at hand.</Typography>
                <Typography paragraph>11. MISCELLANEOUS</Typography>
                <Typography paragraph>11.1. German law applies under exclusion of the UN Sales Law.</Typography>
                <Typography paragraph>11.2. If the Advertiser is a merchant, a legal person of public law or public law special assets or has no general court of jurisdiction in Germany or moves their domicile abroad after conclusion of the contract, or its residence is not known at the time of the complaint being filed, the place of performance and place of jurisdiction for disputes arising from the contract is Berlin.</Typography>
                <Typography paragraph>11.3. In the event of legal disputes between the parties, the German-language contract version takes precedence.</Typography>
                <Typography paragraph>12. SEVERABILITY CLAUSE</Typography>
                <Typography paragraph>Should any of the provisions of this agreement be or become invalid within the meaning of case law in Germany, the validity of the remaining provisions shall remain unaffected. To replace ineffective provisions or close loopholes, an appropriate arrangement should be agreed which most closely resembles what the parties originally intended.</Typography>
                <Typography paragraph>Berlin, September 2022</Typography>
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