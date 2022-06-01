import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { mapOutline, listOutline } from "ionicons/icons";
import MapMain from "./pages/MapMain";
import RecordsList from "./pages/RecordsList";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/map">
            <MapMain />
          </Route>
          <Route exact path="/list">
            <RecordsList />
          </Route>
          <Route exact path="/">
            <Redirect to="/map" exact />
          </Route>
        </IonRouterOutlet>
        <IonTabBar color="primary" slot="bottom">
          <IonTabButton tab="tab1" href="/map">
            <IonIcon icon={mapOutline} />
          </IonTabButton>
          <IonTabButton tab="tab2" href="/list">
            <IonIcon icon={listOutline} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
