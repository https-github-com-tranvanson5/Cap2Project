import { Fragment } from 'react';
import { Route } from 'react-router-dom';

import DefaultLayout from '~/Layouts/DefaultLayout';

export const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        let Layout = DefaultLayout;
        if (route.layout) {
            Layout = route.layout;
        } else if (route.layout === null) {
            Layout = Fragment;
        }
        const Page = route.component;
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <Layout>
                        <Page />
                    </Layout>
                }
            />
        );
    });
};
