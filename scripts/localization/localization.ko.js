/*
 * Software License Agreement (Apache License)
 *
 * Copyright (c) 2016, PPM AS
 * Contact: laszlo.nagy@ppmas.no
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
*/

//add korean translation to available languages
localization.languages.push('ko');

//translation
localization.items.ko = {
    flag: 'scripts/localization/flags/ko.GIF',
    language: '한국의',
    starting: {
        downloadAddons: "추가 기능을 불러오는 중입니다.",
        connectToRos: "ROS 서버에 접속 중",
        hideConnect: "숨기기"
    },
    licensing: {
        notGenerated: "허가되지 않은 라이선스입니다.라이선스가 곧 생성됩니다. 기다려주세요",
        licenseNotFound: "<h3>라이선스를 찾을 수 없습니다.</h3>"
                                + "<p>등록하신 후 <a onclick='window.open(\"@0\", \"_system\");' href='#'>내 프로필</a>로 가서 임시 라이선스를 요청하세요</p>",
        licenseExpired: "<h3>라이선스가 만료되었습니다.</h3>"
                                + "<p>임시 라이선스가 만료되었습니다.</p>",
        userError: "<h3>잘못된 접속정보입니다.</h3>"
                                + "<h4>아이디 또는 비밀번호가 잘못되었습니다.</h4>"
                                    + "<p> <a onclick='window.open(\"@0\",\"_system\")' href='#'>FlexGui 4.0</a>웹사이트에 아이디를 등록했을 경우, 아이디와 비밀번호를 다시한번 확인해주시길 바랍니다.</p>"
                                + "<h4>존재하지 않는 사용자입니다.</h4>"
                                    + "<p><a onclick='window.open(\"@1\", \"_system\")' href='#'>FlexGui 4.0</a>웹사이트에 가입하신 후 내 프로필에서 임시 라이선스를 요청하십시오.</p>"
    },
    wizard: {
        unknownWizard: "<p>이 스크립트는 이 버전(@0)에서 사용할 수 없습니다. 더 많은 정보를 원하시면 <a target='_blank' href='https://www.ppm.no/flexgui4-Home/Index/pricing'>https://www.ppm.no/flexgui4-Home/Index/pricing</a> 를 방문해 주세요</p>",
        addScriptTemplate: "스크립트 템플릿을 추가합니다.",
        output: "출력코드",
        param: "매개변수",
        select: "템플릿 마법사 선택",
        title: "스크립트 템플릿 마법사",
        templates: {
            createTopic: {
                title: "토픽생성",
                help: "주어진 타입과 이름, 그리고 익숙한 이름으로 토픽을 광고하고 선택적으로 구독하세요. 새로운 토픽은 /wizard/[name]의 경로를 가집니다.",
                params: {
                    name: "이름",
                    type: "타입",
                    subscribe: "등록하기",
                    friendlyName: "익숙한 이름",
                    onChange: "스크립트 변경",
                }
            },
            changeScreen: {
                title: "화면 변경",
                help: "현재화면을 선택된 화면으로 변경",
                params: {
                    screen: "화면 변경",
                },
                error: "경고! 존재하지 않는 화면으로 바꿀 수 없습니다. ",
            },
            connectorVariable: {
                title: "연결노드의 변수: 초기화되었습니다.",
                help: "이 템플릿은 노드의 선택된 변수를 자동으로 처리합니다. 이 템플릿은 지역변수를 만들어냅니다. 이 템플릿을 시작 스크립트에 넣는것을 권장합니다.",
                params: {
                    node: "노드",
                    variable: "변수",
                    friendlyName: "익숙한 이름",
                }
            },
            getConnectorVariable: {
                title: "연결 노드의 변수: 값 가져오기",
                help: "이 템플릿은 노드의 선택된 변수의 현재 지역데이터를 반환합니다. 이 템플릿을 피젯의 속성에 집어 넣는것을 권장합니다.",
                params: {
                    node: "노드",
                    variable: "변수",
                }
            },
            setConnectorVariable: {
                title: "연결노드의 변수: 값 지정",
                help: "이 템플릿은 선택된 변수의 지역데이터를 새로운 값으로 지정하고 ROS로 전송합니다. 버튼피젯의 onClick 이벤트에 넣는것을 권장합니다.",
                params: {
                    node: "노드",
                    variable: "변수",
                    value: "새 값",
                    operation: "작동",
                }
            },
            getReadyConnectorVariable: {
                title: "연결노드의 변수: 준비",
                help: "이 템플릿은 만약 노드의 선택된 변수의 쓰기 준비가 완료된 상태라면 True값을 반환합니다. 이 템플릿은 피젯의 속성에 집어넣는것을 권장합니다.",
                params: {
                    node: "노드",
                    variable: "변수",
                }
            },
            autoDefine: {
                title: "변수가 선언되지 않았다면 변수를 선언하십시오",
                help: "이 템플릿은 변수가 아직 선언되지 않았으면 변수에 값을 지정합니다. 만약 변수가 이미 선언되었다면, 아무일도 일어나지 않습니다.",
                params: {
                    variable: "변수",
                    value: "새 값",
                }
            },
            popup: {
                title: "팝업메세지를 보여줍니다.",
                help: "이 템플릿은 팝업메세지를 보여줍니다.",
                params: {
                    message: "메시지",
                    type: "타입",
                }
            },
            timeout: {
                title: "스크립트를 지연시킵니다.",
                help: "이 템플릿은 스크립트를 지연하여 실행시킵니다.",
                params: {
                    timeout: "지연 (밀리초)",
                    type: "타입",
                    name: "이름"
                }
            },
            setFunction: {
                title: "기능을 정의합니다",
                help: "이 템플릿은 사용자 정의 기능을 정의합니다. 정의된 기능은 후에 FlexGui의 어디에서든 Call a function템플릿을 사용하여 불러올 수 있습니다",
                params: {
                    name: "기능의 이름",
                    type: "기능",
                }
            },
            callFunction: {
                title: "기능 불러오기",
                help: "이 템플릿은 사용자 정의 기능을 불러옵니다. 사용자는 이미 지정한 기능에 대하여 Define a fuction템플릿을 사용하여 FlexGui내에 어디에서든지 불러올 수 있습니다",
                params: {
                    name: "기능의 이름",
                },
                error: "경고! 정의되지 않은 기능을 불러올 수 없습니다. ",
            },
            callService: {
                title: "서비스를 불러옵니다.",
                help: "이 템플릿은 노드의 선택된 서비스를 불러옵니다. 올바르게 작동시키기 위해서는 코드를 삽입한 뒤 정확한 매개변수를 지정하여야 합니다.",
                params: {
                    node: "노드",
                    service: "서비스",
                    parameter: "매개변수",
                    callback: "콜백",
                },
            },
        }
    },
    general: {
        emptyList: '빈 리스트',
        background: '배경',
        backgroundColor: '배경 색',
        selectScreenType: '스크린 타입 선택'
    },
    project: {
        clearLocal: '지역 정리',
        download: '다운로드',
        load: '불러오기',
        uploadProject: '프로젝트 업로드',
        compare: '비교',
        availableProjects: '사용가능한 프로젝트',
        name: '이름',
        id: '아이디',
        title: '프로젝트 설정',
        currentProjectTab: '현재 프로젝트',
        projectBrowserTab: '프로젝트 검색기',
        blockMsg: '기다려주세요',
        loading: '프로젝트 불러오는 중…',
        saveError: "프로젝트 저장에 실패했을지도 모릅니다. 취소버튼을 눌러 이 메시지를 없애고 저장하지 않고 계속 진행할 수도 있고, 확인버튼을 눌러 다시 저장을 시도할 수도 있습니다.",
        notForThisVersion: "프로젝트 적용 버전이(@0) 현재 버전과 다릅니다 (@1). 버전을 변환하시겠습니까?",
        canNotConvert: "이 프로젝트는 현재 적용 버전에서 사용할 수 없습니다. 프로젝트를 새로 만드시겠습니까?"
    },
    fidgets: {
        extend: {
            variableSelector: {
                subStart: '노드 @1의 변수 @0에서 등록하기가 시작되었습니다.',
                subEnd: '노드 @1의 변수 @0에서의 등록하기가 완료되었습니다.',
                subFailed: '등록하기가 실패하였습니다.',
                unsubStart: '노드 @1의 변수 @0에서 등록해제가 시작되었습니다.',
                unsubEnd: '노드 @1의 변수 @0에서 등록해제가 완료되었습니다.',
                unsubFailed: '등록해제가 실패하였습니다.',
                subButton: '등록하기',
                unSubButton: '등록해제하기',
                refreshButton: '새로고침',
                title: '@0 노드에 새로운 값 추가하기'
            }
        },
        messenger: '메신저',
        fidgetGroup: '피젯그룹',
        progressBar: '진행상황',
        button: '버튼',
        checkBox: '체크박스',
        textInput: '텍스트 입력',
        text: '텍스트',
        variableSelector: '변수',
        scrollableText: '스크롤 가능한 텍스트',
        slider: '슬라이더',
        radioButton: '라디오버튼',
        fullgauge: '게이지',
        boolean: '불',
        image: '이미지',
        indicatorLamp: '지시등',
        road: '길',
        fence: '울타리',
        camera: '카메라',
        device: '장치',
        genericObstacle: '장애물',
        cameraImage: '카메라 이미지',
        endOfWay: '막다른 길',
        properties: {
            hasScreenBeltValues: {
                show: '보기',
                hide: "숨기기"
            },
            alignments: {
                left: '왼쪽',
                right: '오른쪽',
                center: '가운데',
                justify: '좌우정렬'
            },
            _textAlign: "정렬",
            _font: "글꼴",
            _icon: "아이콘",
            _width: '넓이',
            _height: '높이',
            opacity: '불투명도',
            _angle: '각',
            _value: '값',
            _color: '색',
            _text: '텍스트',
            _fontSize: '글꼴 크기',
            _fontColor: '글꼴 색',
            _min: '최소',
            _max: '최대',
            _step: '단계',
            _precision: '정확도',
            backgroundColor: '배경 색',
            backgroundType: '배경 종류',
            image: "이미지",
            color: "색",
            _options: '옵션',
            _angleOffset: '각 오프셋',
            _angleArc: '각 호',
            _lock: '잠금',
            scale: '범위',
            source: '소스',
            _onColor: '온 컬러',
            _offColor: '오프 컬러',
            _blinking: '깜박임',
            _blinkPeriod: '깜박이는 시간',
            _screenLink: '화면 링크',
            _borderColor: '경계 색',
            _borderWidth: '경계 넓이',
            onClick: '온 클릭',
            name: '이름',
            _node: 'ROS 노드 이름',
            hasScreenBelt: "스크린 벨트를 가지고 있다",
            logo: '로고',
            logoWidth: '로고 넓이',
            logoPosition: '로고 위치',
            logoPositions: {
                bottomRight: '우측 아래',
                bottomLeft: '좌측 아래',
                topLeft: '좌측 위',
                topRight: '우측 위'
            },
            _top: '위',
            _left: '왼쪽',
            _enabled: '켜짐'
        }
    },
    properties: {
        title: '@0의 속성',
        aspectFit: '보호된 aspect fit',
        aspectCrop: '보호된 aspect crop',
        stretch: '늘리다',
        robot: '로봇',
        plc: 'PLC',
        onlyForSingleFidget: '속성벨트는 하나의 피젯당 한번만 사용 가능하다'
    },
    settings: {
        title: 'FlexGui 설정',
        reloadLoginAlert: 'FlexGui를 다시 불러오고 새로운 데이터로 접속하시겠습니까?',
        reloadSettingsAlert: 'FlexGui를 다시 불러오고 현재 설정을 사용하시겠습니까?',
        loadOnNextStartNote: 'FlexGui는 이 설정값을 다음 시동 때 사용할 것입니다.',
        tabs: {
            timers: {
                title: '타이머',
                delay: '지연',
                repeat: '반복',
                enabled: '켜짐',
                name: '이름',
                action: '액션',
                duplicatedError: "이미 사용중인 이름을 사용하여 저장할 수 없습니다. 다른 이름을 사용하여 주십시오."
            },
            enterprise: {
                title: '기업',
                trialTitle: '평가판 모드',
                switchTrial: '체크하여 평가판 모드를 켜십시오',
                username: '유저 아이디',
                password: '비밀번호',
                description: '우리의 올라운드 솔루션, FlexGui 기업버전을 공짜로 사용해보세요. 자세한 정보는 웹사이트에 기재되어있습니다.'
            },
            project: {
                title: '프로젝트',
                uploadNote: '주의, 프로젝트를 업로드할 경우, 현재 프로젝트를 덮어쓰게 됩니다.',
                uploadConfirm: '현재 프로젝트에 덮어쓰기 하시겠습니까?',
                cleanConfirm: '현재 프로젝트를 지우고 새 프로젝트를 불러오시겠습니까?',
                newProject: '새 프로젝트',
                createNew: '만들기',
                upload: '업로드',
                download: '다운로드',
                uploadComplete: '업로드가 완료되었습니다.',
                savedToMobile: '프로젝트 파일이 루트폴더에 저장되었습니다. ',
                savedFailed: '저장을 실패하였습니다.',
                noteUseMobileMemory: '<i><b>주의</b>, 프로젝트를 업로드 하기 위해 내장된 저장공간을 검색하십시오.</i>',
                uploadImagesConfirm: '이 프로젝트는 이미지를 포함하고 있습니다, 현재 존재하는 프로젝트를 덮어쓰시겠습니까?'
            },
            language: {
                title: '언어',
                languageSelectNote: '주의, 이 값을 변경할 경우 FlexGui가 다시 불러오기될 것입니다.',
            },
            general: {
                title: '일반',
                screenScale: '화면 크기 조정',
                small: '작음',
                medium: '중간',
                large: '큼',
                onScreenHelp: '화면의 도움말',
                onScreenHelpSwitch: '체크하여 화면의 도움말을 켜십시오',
                statLabel: "퍼포먼스 모니터",
                statSwitchLabel: "체크하여 퍼포먼스 모니터를 켜십시오",
                gridSize: '격자 크기',
                gridSizeNote: '주의, 이 값을 변경할 경우 FlexGui가 다시 불러오기될 것입니다.',
                gridSizeError: '크기는 30과 200 사이의 값이어야 합니다.',
                forceBelt: '스크린 벨트를 강제로 실행합니다',
                forceBeltSwitchLabel: '스크린 벨트를 강제로 실행합니다',
                autoScale: '자동 크기조정',
                pinchEnabled: '핀치 투 줌',
                switchPinchEnabled: '모바일 기기의 핀치 투 줌 기능을 사용하고 싶으시면 체크하십시오'
            },
            initScript: {
                title: '첫 스크립트',
                note: '초기화 된 스크립트를 여기에 놓으세요',
                autoInitException: '자동 초기화 예외',
                initException: '초기화 시 에러'
            },
            nodes: {
                title: '노드',
                search: '검색중…',
                detailsOf: '@0의 세부 속성',
                searchResult: '검색 결과',
                tooShortError: '검색어가 너무 짧습니다.',
                noResultMsg: '@0검색어에 대한 결과가 없습니다.',
                changeScriptTitle: '@0의 스크립트 변경',
                changeScriptNote: "\'newValue'\와 \'oldValue'\ 명령어를 사용하여 새로운 값과 오래된 값에 바로 접근할 수 있습니다.",
                demoAlert: '오프라인 모드입니다, 노드는 사용불가능 합니다.',
                nodeUnselected: '노드를 사용하여 속성을 나열하십시오',
                topicOfflineError: "이 토픽은 현재 오프라인 상태입니다, 새 값을 발행할 수 없습니다.",
                topicOutOfDateWarning: "이 토픽의 값은 아직 ROS에서 업데이트 되지 않았습니다. 이 새 값을 발행하시겠습니까?"
            },
            conn: {
                title: 'ROS 서버 설정',
                description: 'ROS 서버를 사용하여 노드에 접근하기 위해 ROS서버의 위치를 설정하세요. FlexGui를 오프라인으로 사용하고 싶으실 경우 아래 박스를 체크하세요.',
                ip: '아이피',
                port: '포트',
                offlineMode: '오프라인 모드',
                offlineModeSwitch: '체크하여 ROS의 연결을 종료하십시오',
                secure: '보안모드',
                secureSwitch: '체크하여 보안모드를 켜십시오'
            },
            messenger: {
                title: '메신저'
            },
            mirror: {
                title: '미러모드',
                mirrorModeSwitch: '체크하여 미러모드를 켜십시오',
            },
            theme: {
                title: "테마",
                theme: '테마',
                themeNote: '주의, 이 값을 변경할 경우 FlexGui가 다시 불러오기될 것입니다.',
            },
            userMode: {
                title: "사용자 모드",
                modeSwitch: "FlexGui 화면의 사용을 제한하시려면 체크하십시오",
                password: "관리자 비밀번호",
                confirmPassword: "비밀번호 확인",
                passwordError: "입력된 두개의 비밀번호가 반드시 일치하여야 합니다."
            }
        }
    },
    messenger: {
        invalidUsernamePassword: 'iVAR 메신저에 접속할 수 없습니다. 아이디와 비밀번호를 확인해주세요.',
        missingLoginData: 'iVAR 메신저에 접속할 수 없습니다. 메신저의 설정에서 지정해주십시오.',
        enterMessage: '메시지 입력',
        expertUsername: "숙련자 아이디",
        checkToEnableMessenger: "체크하여 내장된 메신저를 켜십시오",
        messengerEnabled: "메신저를 사용합니다"

    },
    popup: {
        title: 'FlexGui 메신저'
    },
    timers: {
        alreadyRunningError: '타이머가 이미 작동중입니다.',
        disableAll: '전부 사용 중지합니다',
        createNew: '새로 만들기'
    },
    buttons: {
        start: '시작',
        stop: '중지',
        add: '더하기',
        edit: '수정하기',
        duplicate: '복제하기',
        cancel: '취소',
        clear: '정리',
        save: '저장',
        close: '닫기',
        closeAll: '모두 닫기',
        remove: '제거',
        reconnect: '재연결',
        select: '선택',
        removeBackground: '제거',
        pick: '줍기',
        toBack: '뒤로 보내기',
        backward: '뒤쪽으로 보내기',
        toFront: '앞으로 가져오기',
        forward: '앞쪽으로 가져오기',
        moveUp: '위로 움직이기',
        moveDown: '아래로 움직이기',
        addScreen: '화면 추가',
        addFactoryScreen: '공장 화면',
        addNormalScreen: '일반 화면',
        upload: '업로드',
        download: '다운로드'
    },
    editMode: {
        openBelt: '벨트 열기',
        editModeTaken: '<h3>수정권한이 다른 사람에게 있습니다.</h3>',
        confirmTakeEditMode: '수정권한 이전을 확인합니다. 누군가가 수정작업을 진행중입니다. 한번에 한사람만 수정작업을 진행할 수 있습니다. 수정권한을 이전 하시겠습니까?',
        confirmCloseWhenEditing: '수정모드를 종료하시겠습니까?',
        switchLabel: '수정모드',
        settings: '설정',
        properties: '속성',
        snapToGrid: '격자에 맞춤',
        resize: '크기 재조정',
        rotate: '회전',
        multiSelect: '다중선택',
        unSelect: '모두 선택해제',
        undo: '작업 취소',
        redo: '작업 다시 수행',
        copy: '복사',
        cut: '잘라내기',
        paste: '붙여넣기',
        move: '움직이기',
    },
    help: {
        label: '도움말',
        off: '도움말 보이지 않기',
        enterprise: {
            header: '기업 평가판 도움말',
            content: '평가판 모드, 평가판 모드로 FlexGui 4.0의 모든 기능을 공짜로 사용할 수 있습니다. 평가판 모드는 인터넷 연결을 필요로 합니다. 사용방법. 평가판을 실행하기 위해서는 이 지시사항들을 따라야 합니다. Flexgui4.ppm.no 웹사이트에 등록하고 내 프로필 페이지에 들어가서 FlexGui 4.0 평가판의 라이선스를 요청하여야 합니다.'
        },
        screenBelt: {
            header: '스크린 벨트의 도움말',
            screen: '화면',
            screenText: '스크린 벨트에서 프로젝트의 모든 화면을 볼 수 있습니다. 한번 클릭하면 화면이 선택될 것입니다. 두번 클릭하면 해당 화면의 속성을 수정할 수 있습니다.',
            newScreen: '새 화면',
            newScreenText: '스크린 리스트의 끝에 있는 '+' 를 클릭하여 새 화면을 추가할 수 있습니다. 더블 클릭하여 스크린의 이름을 재설정하거나 스크린을 삭제할 수 있습니다.',
            properties: '속성 벨트',
            propertiesText: '피젯을 스크린벨트로 드래그하면, 피젯은 원위치로 돌아가서 피젯의 속성벨트를 열것입니다.'
        },
        initScript: {
            header: '스크립트 초기화의 도움말',
            text: '예를 들어 지역변수를 초기화 하는 등의 프로젝트를 초기화 하는 스크립트를 여기에 쓸 수 있습니다. '
        },
        settings: {
            header: '윈도우 설정의 도움말',
            scale: '화면 크기 조정',
            scaleText: '모바일 기기의 화면 크기조정을 이 버튼들로 실행할 수 있습니다.',
            scaleNote: '주의, 모바일 기기의 화면 크기조정은 핀칭으로도 가능합니다. 데스크탑에서는 브라우저에 있는 기본 크기조정을 사용할 수 있습니다.',
            help: '화면의 도움말',
            helpText: '<span class="glyphicon glyphicon-question-sign"></span>아이콘을 켰다 껐다 할 수 있습니다.'
        },
        fidgetBelt: {
            header: '피젯벨트의 도움말',
            fidgets: '피젯',
            fidgetsText: '피젯 벨트에서 모든 사용가능한 피젯들을 찾을 수 있으며 드래그하여 화면에서 사용할 수 있습니다. 컴퓨터의 스크롤이나 터치스크린의 드래그로 모든 피젯을 볼 수 있습니다.',
            deleteBelt: '벨트 삭제',
            deleteBeltText: '피젯을 피젯벨트로 드래그 하면 피젯이 지워질 것입니다. 후에 피젯벨트에서 다시 드래그하여 지워짓 피젯을 추가할 수 있습니다.'
        },
        loginWindow: {
            header: '접속화면의 도움말',
            title: "접속화면",
            content: "관리자 권한으로 접속을 하기 위해서는 관리자의 아이디와 비밀번호를 입력하세요. 손님계정으로는 FlexGui의 인터페이스는 사용가능 하지만 내용을 수정하거나 변경할 수 없습니다."
        },
        connectionSettings: {
            header: 'ROS 서버 설정의 도움말',
            title: "연결 설정",
            content: "ROS에 연결되는 ROSBridge서버를 구동하는 컴퓨터의 주소를 명시하세요. 기본 포트는 대부분 9090입니다."
        },
        nodes: {
            header: '노드 도움말',
            title: "노드",
            content: "ROSBridge서버의 연결이 올바르다면 드랍다운 목록에 활동중인 노드들이 나열될 것입니다. FlexGui의 ROS 토픽의 데이터를 사용하기 위해서 그 옆의 등록 버튼을 체크하세요."
        },
        messenger: {
            header: '메신저 도움말',
            title: "메신저",
            content: "메신저에서 채팅이나 비디오를 사용하기 위해서 계정 정보를 제공하여야 합니다."
        },
        language: {
            header: '언어 도움말',
            title: "언어",
            content: "You can chose your preferred language. FlexGui will reload when you change this value. In case you don't find the language you like, please contact us in FlexGui.net."
        },
        project: {
            header: '프로젝트 도움말',
            title: "프로젝트",
            content: "쉽게 프로젝트 파일들을 이동하거나 백업하기 위해서 프로젝트 파일들을 업로드하거나 다운로드 할 수 있습니다."
        },
        propertiesWindow: {
            header: '속성화면 도움말',
            title: "속성화면",
            content: "<p>피젯의 속성은 여기서 바꿀 수 있습니다. 모든 피젯은 사용자설정이 가능한 속성을 가지고 있습니다.</p>"
					+ "<h5>온 클릭 스크립트</h5>"
					+ "<p>만약 피젯이 온 클릭 속성을 가지고 있다면 스크립트는 피젯을 클릭하거나 탭하는것으로 실행시킬 수 있습니다.</p>"
                    + "<h5>위치조작 버튼</h5>"
                    + "<p>위치조작 버튼은 몇 개의 겹치는 피젯을 배열하기 위해 있습니다.</p>"
					+ "<ul>"
                    + "<li>뒤로 보내기: 피젯이 화면의 가장 낮은 레이어로 보내집니다.</li>"
                    + "<li>뒤쪽으로 보내기: 피젯이 한 레이어 뒤로 보내집니다.</li>"
                    + "<li>앞으로 가져오기: 피젯이 가장 앞의 레이어로 옵니다.</li>"
                    + "<li>앞쪽으로 가져오기: 피젯이 한 레이어 앞으로 옵니다.</li>"
					+ "</ul>"
        },
        colorPick: {
            header: '색상 피커 도움말',
            title: "색상 피커",
            content: "속성의 색을 피커에서 가장 많이 사용한 색으로 바꿉니다. HTML코드를 이용하여 사용자 지정 색상을 사용할 수 도 있습니다."
        },
        imageExplorer: {
            header: '이미지 검색기 도움말',
            title: "이미지 검색기",
            content: "업로드 탭의 남아있는 공간에 원하는 이미지를 업로드 합니다. 이미지를 저장할 저장공간을 지정하고 위치를 명시합니다. 업로드 된 이미지를 이미지피젯에 지정하거나 화면 배경으로 지정할 수 있습니다."
        },
        fidgetGroup: {
            header: '피젯 그룹 도움말',
            title: "피젯 그룹",
            content: "여러 피젯을 피젯 컨테이너에 집어넣을 수 있습니다. 피젯 그룹에서 피젯들은 서로 연결된 레이아웃과 함께 움직일 수 있습니다."
        },
        image: {
            header: '이미지 피젯 도움말',
            title: "이미지",
            content: "이미지 피젯은 FlexGui화면에 사용자 정의 이미지를 나타낼 수 있습니다."
        },
        messenger: {
            header: '메신저 도움말',
            title: "메신저 접속 정보",
            content: "유저 정보를 화면에서 지정하여 FlexGui 메신저를 사용할 수 있습니다. Expert Site관리자에서 요청해주세요."
        },
        mirrorMode: {
            header: '미러모드 도움말',
            content: "미러모드는 FlexGui의 현재 작동 화면을 iVAR Expert로 보낼 수 있습니다. 이렇게 하면 전문가들은 FlexGui를 보고 원격으로 도움을 줄 수 있습니다."
        },
        themes: {
            header: '테마 도움말',
            content: "테마를 클릭하여 FlexGui의 보기를 바꿀 수 있습니다. 사용자 정의 테마가 필요하다면 FlexGui.net에 연락해주시길 바랍니다."
        },
        cameraImage: {
            header: '카메라 이미지 도움말',
            content: "피젯이 나타내는 카메라 이미지는 아이피 카메라의 비디오 스트림입니다. 소스의 속성을 .mjpg로 지정하면 비디오가 나타날 것입니다. 만약 카메라에 비밀번호가 걸려있다면, 팝업창에 아이디와 비밀번호를 입력하시기 바랍니다."
        },
        userMode: {
            header: '유저모드',
            content: '유저모드에서 FG화면의 사용을 제한할 수 있습니다. 관리자 모드에서 비밀번호를 설정할 수 있습니다. 기본값은 \'admin\'입니다.'
        },
        timers: {
            header: '타이머',
            content: '타이머로 타임아웃과 구간을 조정할 수 있습니다. 반복버튼을 체크하여 구간을 만들 수 있습니다. 구간은 반복이 체크되어 있는 동안 혹은 타임아웃이 멈춰있는 동안 반복될 것입니다. 타임아웃의 최소한의 지연은 30밀리초입니다.'
        }
    },
    login: {
        login: '접속',
        username: '유저 아이디',
        password: '비밀번호',
        guest: '손님',
        logout: '접속종료',
        fullScreen: '전체화면',
        loginError: '아이디나 비밀번호가 일치하지 않습니다.',
        logoutSuccess: '접속이 종료되었습니다.'
    },
    demo: {
        callError: '오프라인모드에서 전화를 할 수 없습니다.'
    },
    ros: {
        connectionError: 'FlexGui 4.0은 ROS서버에 연결할 수 없습니다. ',
        connectionErrorBody: '연결이 끊어졌을 경우에는 ROS서버에 연결할 수 없습니다. 재연결은 원하신다면, 재연결 버튼을 누르시면 됩니다. 오프라인 모드에서 오프라인으로 작업을 진행할 수도 있습니다. 더 많은 정보는 웹사이트에서 찾아보실 수 있습니다.',
        reconnect: '재연결',
        back: '뒤로가기',
        offlineMode: '오프라인 모드',
        demoBody: '현재 프로젝트를 유지하시겠습니까? 현재 프로젝트를 유지하시면 오프라인 프로젝트에 현재 프로젝트가 덮어쓰여질 것입니다.',
        keepProject: '프로젝트 유지',
        discardProject: '프로젝트 폐기',
        communicationInitError: '대화 초기화 예외사항',
        versionIsNotLatest: { 
            body: "프로젝트가 최신버전이 아닙니다, 업데이트 하시겠습니까? 업데이트 시 현재 버전에 변경사항이 덮어쓰여집니다.",
            title: "프로젝트가 최신버전이 아닙니다.",
            overwrite: "서버에서 덮어쓰기",
            update: "마인 업데이트"
        },
        interfaces: {
            type: '타입',
            originalName: '이름',
            friendlyName: '익숙한 이름',
            subscribe: '등록',
            changeScript: '스크립트 변경',
            notYetImplementedError: '아직 실행되지 않았습니다.',
            dupeError: '다른 인터페이스가 같은 이름을 가지고 있습니다.'
        }
    },
    images: {
        title: '이미지 검색기',
        imagesTabTitle: '이미지',
        uploadTabTitle: '업로드',
        resizeAlert: '이 이미지의 크기는 1024x768의 해상도로 재조정 될것입니다.',
        selectSlot: '위치 지정',
        selectFile: '파일 지정',
        blockMsg: '이미지 업로드 중',
        imageError: '이미지 파일만 업로드 할 수 있습니다, PNG, BMP, JPG파일 중 하나를 선택해주세요.',
        confirmOverwrite: '현재 이미지에 덮어쓰시겠습니까?'
    },
    nachiLink: {
        addVariable: "변수 추가",
        connectionsTab: "연결",
        connectionError: "@0에 연결할 수 없습니다.",
        secure: "보안",
        IP: "아이피",
        port: "포트",
        connected: "연결됨",
        Name: "이름",
        createNew: "새로 만들기",
        reconnect: "재연결",
        zeroConnection: "직접 연결을 찾을 수 없습니다…",
        nameLocked: "이름은 연결된 FlexGui에서 받아옵니다. 이름은 변경할 수 없습니다."
    },
    timeago: {
        settings: {
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: '이전에',
                suffixFromNow: '지금부터',
                inPast: '이제 곧',
                seconds: '금방',
                minute: '1분정도 ',
                minutes: '%d 분',
                hour: '한시간 정도',
                hours: '%d 시간 정도',
                day: '하루',
                days: '%d 일',
                month: '한달 정도',
                months: '%d 달',
                year: '1년 정도',
                years: '%d 년',
                wordSeparator: ' ',
                numbers: []
            }
        }
    }
}