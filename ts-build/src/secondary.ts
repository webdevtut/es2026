import 'prop-for-that/auto';
import { bootstrapRoute } from "./core/bootstrap";
import "./components/secondary.component";

const appHost = document.getElementById("app");

if (appHost) {
    const route = document.body.dataset.page ?? "secondary";
    bootstrapRoute(route, appHost);
}
