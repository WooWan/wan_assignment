## 과제 실행 방법

1. 로컬에서 실행하는 방법 , `npm run ios`로 프로젝트를 실행합니다.
   1. 저장소를 clone 합니다.
   2. `npm install`로 의존성을 설치합니다.
   3. `npm run ios`로 프로젝트를 실행합니다.

## 🔥 과제에 대한 설명

#### 과제에서 느낀 점

- React native를 처음 사용하면서 진행한 과제입니다.
  
- animation 같은 경우, `reanimated`와 `moti` 2개의 라이브러리를 사용하여 구현하였습니다.

  - `moti`는 `reanimated`를 기반으로 만들어졌고, 선언형으로 animation을 구현할 수 있다는 점이 `framer-motion`과 비슷하다고 생각이 들었습니다.

- 기존 check list 데이터에 id와 isCompleted를 추가하는 것이 기능을 구현하는 데 적합하다고 판단하여 field를 추가하였습니다.

#### 구현 요구사항

- [x] 선택한 주에 해당하는 todo list

  - 사용자가 week를 선택 또는 드래그 할 시, todo list가 변경됩니다.
  - 드래그 할 시, debounc를 사용하여, 500ms 이내에 다시 드래그를 하지 않으면, todo list가 변경되도록 구현하였습니다.
  - `react-native-reanimated` 라이브러리를 사용하여, layout animation을 구현하였습니다.
    - 기존에는 bulit-in animation을 사용하였지만 week를 변경할 때, animation이 즉시 반영되지 않는 문제가 있어 custom animation을 구현하였습니다. (아래 링크 참고)
    - https://github.com/software-mansion/react-native-reanimated/issues/3662#issuecomment-1369107481

- [x] 해당 주차에 todo 가 많으면 flatlist를 적용하여도 느려, 벤치마크를 참고하여 flashlist 라이브러리를 사용하였습니다.

- [x] toast component 재사용을 위해 분리하고, undo 기능을 구현하였습니다.
