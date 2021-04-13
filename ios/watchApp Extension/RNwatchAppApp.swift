//
//  RNwatchAppApp.swift
//  watchApp Extension
//
//  Created by Medepia on 11.04.2021.
//

import SwiftUI

@main
struct RNwatchAppApp: App {
    @SceneBuilder var body: some Scene {
        WindowGroup {
            NavigationView {
                ContentView()
            }
        }

        WKNotificationScene(controller: NotificationController.self, category: "myCategory")
    }
}
