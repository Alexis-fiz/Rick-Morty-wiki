import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Select, { SingleValue } from 'react-select';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllCharactersAsync, setShowCharacters } from './charactersSlice';

import CharacterTile from './CharacterTile';
import styles from './Characters.module.css';

import { ICharacter, IOption, Nullable, StatusLabel, StatusValue } from '../../helpers/types';

const options = [
  {label: StatusLabel.ANY, value: StatusValue.ANY},
  {label: StatusLabel.ALIVE, value: StatusValue.ALIVE},
  {label: StatusLabel.DEAD, value: StatusValue.DEAD},
  {label: StatusLabel.UNKOWN, value: StatusValue.UNKOWN},
]
const initialPage = 1;
const defaultOption = options[0];

export default function Characters() {
    const [statusSelected, setStatusSelected] = useState<SingleValue<IOption>>(defaultOption);
    const [searchValue, setSearchValue] = useState<string>('');

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch();
    const page = useAppSelector((state) => state.characters.page);
    const characters = useAppSelector((state) => state.characters.characters);
    const allCharacters = useAppSelector((state) => state.characters.allCharacters);

    const info = useAppSelector((state) => state.characters.info);
    const {pages, next, prev} = info;  

    function getUrlParams(_page: Nullable<number> = null, _query: Nullable<string> = null, _status: Nullable<string> = null) {
      let paramsUrl: any = {page: _page};
      if (_query) {
        paramsUrl = {...paramsUrl, name: _query};
      };
      if (_status) {
        paramsUrl = {...paramsUrl, status: _status};
      };
      return paramsUrl;
    }
    
    useEffect(() => {
      const currentStatus = searchParams.get('status');
      const currentPage = parseInt(searchParams.get('page')!) || initialPage;
      const statusFound = options.find(st => st.value === currentStatus);
      const currentQuery = searchParams.get('name') || '';
      console.log('useEffect');
      setStatusSelected(statusFound!);
      setSearchValue(currentQuery);
      dispatch(getAllCharactersAsync(getUrlParams(currentPage, currentQuery, currentStatus)));
    }, [dispatch, searchParams])

    function onClickPagination(newPage: number) {
        if(newPage <= 0 || newPage > pages) return;
        const params = getUrlParams(newPage, searchValue, statusSelected?.value);
        setSearchParams(params)
        const charactersInPage = allCharacters[newPage];
        if(charactersInPage && (!statusSelected?.value && !searchValue)) {
          dispatch(setShowCharacters({page: newPage, characters: charactersInPage}));
          return;
        }
        dispatch(getAllCharactersAsync(params));
    }
    
    async function onChangeStatus(status: SingleValue<IOption>) {
      setStatusSelected(status);
      const params = getUrlParams(initialPage, searchValue, status?.value);
      setSearchParams(params);
      dispatch(getAllCharactersAsync(params));
    }

    function handleDebouncefn(value: string, status: SingleValue<IOption>) {
      const params = getUrlParams(initialPage, value, status?.value);
      if (!value.length) {
        dispatch(getAllCharactersAsync(params));
        setSearchParams(params)
        return;
      }
      if (value.length < 4) return;
      setSearchParams(params)
      dispatch(getAllCharactersAsync(params))
    }

    const debouncedChangeHandler = useCallback(
      debounce(handleDebouncefn, 500)
    , []);

    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
      const { value } = e.target;
      setSearchValue(value);
      debouncedChangeHandler(value, statusSelected);
    }

    return (
        <div>
            <div className={styles.heroWrapper}>
                <h1 className={styles.heroTitle}>The Rick and Morty Wiki</h1>
                <div className={styles.filterContainer}>
                  <input type="text" className={styles.filterInput} value={searchValue} onChange={onChangeInput} />
                  <Select
                    options={options} 
                    value={statusSelected} 
                    onChange={onChangeStatus}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        borderRadius: '0 26px 26px 0',
                        border: 0,
                        outline: 0
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        height: '50px',
                        width: '100px'
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: 'rgb(255, 152, 0)',
                        primary: '#0a192f',
                      },
                    })}
                  />
                </div>
                <div className={styles.paginationContainer}>
                  <button className={styles.paginationBtn} onClick={() => onClickPagination(page - 1)} disabled={!prev} >Prev</button>
                  {page > 2 && <button className={styles.paginationBtn} onClick={() => onClickPagination(page - 2)}>{page - 2}</button>}
                  {page > 1 && <button className={styles.paginationBtn} onClick={() => onClickPagination(page - 1)}>{page - 1}</button>}
                  <button className={styles.currentPage} disabled >{page}</button>
                  {page + 1 < pages && <button className={styles.paginationBtn} onClick={() => onClickPagination(page + 1)}>{page + 1}</button>}
                  {page + 2 < pages && <button className={styles.paginationBtn} onClick={() => onClickPagination(page + 2)}>{page + 2}</button>}
                  {page !== pages && <button className={styles.paginationBtn} onClick={() => onClickPagination(pages)}>{pages}</button>}
                  <button className={styles.paginationBtn} onClick={() => onClickPagination(page + 1)} disabled={!next}>Next</button>
                </div>
                <div className={styles.heroImage}>
                  <svg width="378" height="376" viewBox="0 0 378 376" fill="#64ffda">
                    <path d="M92.2871 10.1699C90.3999 25.8964 84.8432 45.0828 82.1173 45.0828C81.3834 45.0828 76.3509 42.986 71.0038 40.4697C62.4067 36.4856 49.3012 32.5016 44.4784 32.5016C43.2202 32.5016 43.8493 34.3888 46.8898 40.5746C51.5029 49.9057 55.6966 64.4789 55.1724 69.5114L54.8579 72.8664L45.422 73.6004C17.9529 75.6972 5.05709 76.9554 5.05709 77.4796C5.05709 77.899 9.67022 82.8266 15.3318 88.593C25.921 99.2871 33.6795 110.715 33.1552 114.699C32.9455 116.167 27.5985 120.57 16.5899 128.224C7.67819 134.41 0.234278 139.966 0.0245907 140.491C-0.185097 141.015 0.968185 141.749 2.64569 142.168C13.864 144.58 18.6868 146.152 22.6709 148.459C28.1227 151.709 33.7843 156.532 36.6151 160.516L38.712 163.451L26.9694 175.089C17.1141 184.944 15.4366 186.937 16.6948 188.09C17.5335 188.824 23.8241 191.235 30.7438 193.332C37.6635 195.429 43.7445 197.631 44.2687 198.155C44.7929 198.679 43.9541 204.026 41.9621 211.365C40.1798 218.18 39.0265 224.156 39.341 224.68C39.8652 225.624 57.1645 224.785 59.9952 223.737C62.6163 222.793 63.6648 225.309 64.3987 233.592C64.8181 238.415 65.4471 242.504 65.8665 242.713C66.7052 243.238 78.4478 238.205 78.4478 237.366C78.4478 237.052 77.0848 234.85 75.4073 232.439C70.5845 225.414 67.3343 218.18 64.2938 208.115C62.826 202.873 60.6243 195.848 59.5759 192.388C58.4226 188.929 57.2693 184.211 57.0596 181.904C55.5918 170.791 55.3821 166.702 56.4306 166.702C56.9548 166.702 57.479 168.484 57.479 170.581C57.5838 175.299 59.8904 187.88 61.4631 192.388C62.0921 194.066 64.0842 200.252 65.8665 206.018C70.1651 219.543 76.3509 231.705 81.6979 237.052C84.2142 239.568 89.666 243.133 94.9082 245.544L103.715 249.633L103.401 253.512L103.086 257.392L79.7059 265.15L56.3257 273.013L53.2852 282.973C51.6077 288.53 46.8898 304.991 42.696 319.669C38.5023 334.242 34.5182 346.823 33.8891 347.452C33.2601 348.081 31.3729 353.743 29.8002 360.138C28.2276 366.429 26.7598 372.51 26.4452 373.454C25.921 375.236 30.1148 375.341 104.554 375.341C179.098 375.341 183.292 375.236 183.292 373.454C183.292 372.51 178.364 367.058 172.283 361.397C166.202 355.735 161.274 350.493 161.274 349.654C161.274 348.92 165.049 345.041 169.557 341.057C181.09 331.202 181.195 330.573 176.477 318.515C168.509 298.281 151.419 267.037 145.128 261.166C143.136 259.279 142.402 257.496 142.402 254.666C142.402 250.367 143.346 249.319 148.693 247.536C154.145 245.754 159.492 241.665 163.162 236.528C166.097 232.439 167.355 231.705 175.428 229.189C180.356 227.616 184.34 225.938 184.34 225.519C184.34 224.995 182.453 222.269 180.146 219.543C175.638 214.091 174.799 210.212 177.84 209.268C178.783 208.954 182.453 208.429 185.913 208.01C189.372 207.696 192.518 207.171 192.937 206.857C193.881 206.437 188.534 191.55 187.276 191.025C186.856 190.816 186.437 189.872 186.437 188.824C186.437 187.566 187.905 186.622 191.679 185.678C198.179 184.001 213.696 176.557 213.696 175.194C213.696 174.565 211.704 173.097 209.293 171.839C195.873 165.024 184.969 157.161 187.171 155.903C187.59 155.693 191.469 154.435 195.663 153.177C199.857 151.919 206.672 149.298 210.865 147.41C218.1 144.16 232.988 135.353 232.358 134.724C231.939 134.41 203.526 122.248 200.8 121.304C199.542 120.78 199.228 120.151 199.752 119.207C200.171 118.369 207.091 111.659 215.059 104.32C222.923 96.8757 229.423 90.4802 229.423 90.0608C229.423 89.2221 222.922 88.0688 203.736 85.3429C196.816 84.2944 190.735 83.246 190.316 82.8266C189.792 82.4072 194.615 73.181 201.01 62.3821C211.39 44.6635 213.382 40.8891 212.333 40.8891C212.124 40.8891 203.526 43.9296 193.252 47.7039C178.259 53.1558 174.17 54.2043 173.122 53.1558C170.815 50.8493 168.613 33.55 168.613 18.0331V3.04048L160.121 7.54876C150.161 12.8958 136.846 23.2753 130.66 30.5096C128.353 33.3403 125.942 35.6469 125.523 35.6469C124.998 35.6469 121.014 30.8241 116.506 24.848C108.748 14.5733 95.6421 6.4671e-06 94.1743 6.4671e-06C93.7549 6.4671e-06 92.9162 4.61313 92.2871 10.1699ZM95.2228 272.908C91.3435 275.949 71.5281 328.266 73.1007 330.992C73.6249 331.935 78.1332 336.234 83.1657 340.638C88.3031 345.041 92.6017 349.13 92.8114 349.759C93.021 350.388 91.7629 352.695 89.9806 354.896C88.3031 357.098 86.8353 358.251 86.8353 357.517C86.8353 356.888 87.7788 355.001 89.037 353.533L91.2387 350.703L81.1737 341.267C74.1492 334.661 71.1087 331.097 71.1087 329.419C71.1087 326.064 83.0609 293.982 90.3999 277.522C92.1823 273.537 93.6501 271.545 94.9082 271.545C96.5857 271.65 96.5857 271.755 95.2228 272.908Z" />
                    <path d="M270.733 147.306C241.272 152.653 225.021 164.29 203.948 195.429C199.335 202.139 199.02 202.978 199.02 209.478C199.02 214.51 197.972 219.438 195.246 227.93C190.633 242.294 190.842 245.649 197.447 256.867C200.068 261.271 202.165 265.465 202.165 265.989C202.165 266.618 200.802 268.61 199.02 270.497C193.463 276.473 193.568 285.699 199.335 291.885C202.69 295.345 210.553 298.595 212.65 297.232C213.174 296.918 212.44 294.506 211.077 291.78C209.609 289.159 208.456 286.224 208.561 285.28C208.561 284.232 209.085 284.546 209.714 286.224C211.496 290.103 219.779 302.894 223.868 307.926C231.941 317.991 249.345 328.161 265.596 332.46C270.524 333.718 279.226 334.871 286.565 335.186C293.484 335.5 298.202 336.129 297.049 336.549C290.758 338.75 261.821 334.661 248.506 329.629L241.587 327.008L239.804 329.419C233.199 338.121 225.65 357.937 223.763 371.357L223.239 375.341H288.242C349.681 375.341 353.245 375.236 352.721 373.454C352.407 372.51 350.729 366.219 349.052 359.509C345.382 345.041 342.446 337.807 337.728 331.621C335.841 329.105 334.269 326.484 334.269 325.75C334.373 325.121 336.994 322.604 340.245 320.298C346.116 316.104 354.189 307.612 358.592 300.902C360.06 298.7 362.367 296.918 364.464 296.289C366.246 295.764 369.601 293.563 371.907 291.466C379.142 284.546 379.876 275.11 373.48 269.553C371.278 267.666 370.964 266.723 371.593 263.368C372.012 261.271 372.641 259.279 373.061 258.964C373.48 258.65 374.424 255.609 375.158 252.149C376.206 247.117 376.206 243.238 375.158 232.439C374.424 225.1 373.375 219.124 372.851 219.124C372.327 219.124 372.012 216.188 372.117 212.518C372.327 206.752 371.803 204.97 368.028 197.631C362.996 187.67 355.552 176.767 348.003 168.589C343.39 163.556 340.349 161.564 328.502 155.693C320.115 151.604 311.517 148.144 307.324 147.306C298.622 145.418 280.798 145.418 270.733 147.306Z" />
                    <path d="M147.646 261.69C147.646 262.005 149.638 264.94 152.154 268.19C154.67 271.441 158.13 276.578 160.017 279.409C164.945 287.272 176.373 311.805 179.728 321.556C183.397 331.935 183.083 332.669 172.074 342C167.88 345.565 164.421 349.34 164.421 350.178C164.421 351.122 169.138 356.154 174.905 361.606C181.196 367.373 185.389 372.091 185.389 373.349C185.389 375.236 186.228 375.341 200.067 375.341C211.076 375.341 214.746 375.026 214.746 373.978C214.746 369.574 189.059 277.207 186.647 272.804C186.228 271.965 179.518 269.763 171.76 267.771C164.001 265.884 155.928 263.577 153.726 262.634C149.428 260.956 147.646 260.642 147.646 261.69Z" />
                  </svg>
                </div>
            </div>
            <ul className={styles.listContainer}>
              {characters.map((character: ICharacter) => (
                <CharacterTile key={character.id} character={character} />
              ))}
            </ul>
        </div>
    );
}
