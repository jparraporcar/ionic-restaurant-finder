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
import RecordDetails from "./pages/RecordDetails";
import "./App.css";

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
          <Route exact path="/list/:id">
            <RecordDetails />
          </Route>
          <Route exact path="/">
            <Redirect to="/map" exact />
          </Route>
        </IonRouterOutlet>
        <IonTabBar color="primary" slot="bottom">
          <IonTabButton
            tab="MapMain"
            href="/map"
            onClick={() => {
              document.getElementById("mapOutline")!.style.color = "white";
              document.getElementById("listOutline")!.style.color =
                "rgb(196, 190, 190)";
            }}
          >
            <IonIcon id="mapOutline" icon={mapOutline} />
          </IonTabButton>
          <IonTabButton
            tab="RecordList"
            href="/list"
            onClick={() => {
              document.getElementById("listOutline")!.style.color = "white";
              document.getElementById("mapOutline")!.style.color =
                "rgb(196, 190, 190)";
            }}
          >
            <IonIcon id="listOutline" icon={listOutline} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
