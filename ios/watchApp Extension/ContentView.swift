//
//  ContentView.swift
//  watchApp Extension
//
//  Created by Medepia on 11.04.2021.
//

import SwiftUI

struct ContentView: View {
  var receivedData : String = ""
  @ObservedObject var model = WatchModel()
  
    var body: some View {
      VStack {
        Text("Gelen Data : ")
        Text(self.model.message)
              .padding()
      }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
