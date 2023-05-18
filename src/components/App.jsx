// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import fetchImages from '../Services/fetchImages';
// import { fetchImages } from '../Services/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

// export class App extends Component {
const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  // const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('largeImageURLmayBe');
  const per_page = 12;
  // state = {
  //   images: [],
  //   page: '',
  //   searchQuery: '',

  //   per_page: 12,
  //   isLoading: false,
  //   loadMore: false,
  //   error: null,
  //   showModal: false,
  //   largeImageURL: 'largeImageURLmayBe',
  //   id: '',
  // };
  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    if (!searchQuery) {
      return;
    }

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      setIsLoading(true);
      setIsLoading(true);
      if (totalHits === 0) {
        alert('Sorry, we do not find images');
      }
      console.log(totalHits, hits);
      const normalizedImages = hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        }
      );
      console.log(hits, totalHits);
      setImages(prevImages => [...prevImages, ...normalizedImages]);
      setLoadMore(page < Math.ceil(totalHits / per_page));
    } catch (error) {
      // setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // componentDidUpdate(_, prevState) {
  //     console.log(prevState.page);
  //     console.log(this.state.page);
  //     const { searchQuery, page } = this.state;
  //     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
  //       this.getImages(searchQuery, page);
  //     }
  //   }
  const formSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };
  // formSubmit = searchQuery => {
  //     this.setState({
  //       searchQuery,
  //       images: [],
  //       page: 1,
  //       loadMore: false,
  //     });
  //     console.log(searchQuery);
  //   };

  // getImages = async (searchQuery, page) => {
  //     this.setState({ isLoading: true });

  //     if (!searchQuery) {
  //       return;
  //     }
  //     try {
  //       const { hits, totalHits } = await fetchImages(searchQuery, page);
  //       console.log(totalHits, hits);
  //       const normalizedImages = hits.map(
  //         ({ id, webformatURL, largeImageURL, tags }) => {
  //           return {
  //             id,
  //             webformatURL,
  //             largeImageURL,
  //             tags,
  //           };
  //         }
  //       );

  //       if (totalHits === 0) {
  //         alert('Sorry, we do not find images');
  //       }
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...normalizedImages],
  //         loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
  //       }));
  //     } catch (error) {
  //       this.setState({ error: error.message });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  const onloadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
    // scrollOnMoreButton();
  };
  // onloadMore = () => {
  //   this.setState(prevState => ({ page: prevState.page + 1 }));
  // };
  const openModal = (largeImageURL, tags) => {
    console.log(largeImageURL);
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };
  // openModal = largeImageURL => {
  //   this.setState({
  //     showModal: true,
  //     largeImageURL: largeImageURL,
  //   });
  //   console.log(largeImageURL);
  // };
  const closeModal = () => {
    setShowModal(false);
  };
  // closeModal = () => {
  //   this.setState({
  //     showModal: false,
  //   });
  // };

  // render() {
  // паттерн деструктуризации пропсов state
  // const { images, isLoading, loadMore, page, showModal, largeImageURL } =
  //   this.state;

  return (
    <div>
      <Searchbar onSubmit={formSubmit} />
      {/* {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={this.openModal} />
        )} */}
      <Loader isLoading={isLoading} />
      <ImageGallery images={images} openModal={openModal} />
      {loadMore && <Button onloadMore={onloadMore} page={page} />}
      {/* портал для модалки в index.html */}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};
export default App;
// }
