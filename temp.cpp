#include<bits/stdc++.h>
using namespace std;

int main() {
    string a, b, s;    cin >> a >> b;
    int n;  cin >> n;
    set<string> st;     while(n--) {    cin >> s;   st.insert(s);   }

    int d = 0;  for(int i = 0; i < a.length(); i++)  d += (a[i] != b[i]);
    
    vector<string> re;  
    bool flag = false;
    if(d > 0)   re.push_back(a);
    while(d > 1) {
        flag = true;
        for(int i = 0; i < a.length(); i++) {
            if(a[i] == b[i])    continue;
            char tmp = a[i];  a[i] = b[i];
            if(!st.count(a)) { a[i] = tmp; continue; }
            flag = false;
            re.push_back(a);
        }
        if(flag)   break;
    }
    re.push_back(b);
    if(!flag)   cout << "Transformation is not possible";
    else    for(string t : re)      cout << t << '\n';
}